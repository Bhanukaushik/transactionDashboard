
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Connect to PostgreSQL Database using DATABASE_URL
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Check database connection
db.connect()
  .then(() => console.log('Connected to PostgreSQL database successfully'))
  .catch(err => console.error('Database connection error:', err.stack));

// Initialize Database
app.get('/api/initialize', async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await db.query('DELETE FROM transactions');
    const validData = data.filter(item => item.dateOfSale);
    const values = validData.map(item => [
      item.title,
      item.price,
      item.description,
      item.category,
      item.image,
      item.sold,
      new Date(item.dateOfSale).toISOString().split('T')[0]
    ]);

    if (values.length > 0) {
      const placeholders = values.map((_, i) => `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`).join(',');
      await db.query(
        `INSERT INTO transactions (title, price, description, category, image, sold, dateofsale) VALUES ${placeholders}`,
        values.flat()
      );
    }

    const { rows } = await db.query('SELECT COUNT(*) FROM transactions');
    res.json({ message: `Database initialized successfully, inserted ${rows[0].count} records.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Transactions with Search & Pagination
app.get('/api/transactions', async (req, res) => {
  try {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;
    const query = `SELECT * FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 AND (title ILIKE $2 OR description ILIKE $2 OR CAST(price AS TEXT) ILIKE $2) LIMIT $3 OFFSET $4`;
    const values = [month, `%${search}%`, perPage, offset];
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Transaction Statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const { month } = req.query;
    const totalSalesQuery = 'SELECT SUM(price) AS totalSales FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1';
    const soldItemsQuery = 'SELECT COUNT(*) AS soldItems FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 AND sold = true';
    const unsoldItemsQuery = 'SELECT COUNT(*) AS unsoldItems FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 AND sold = false';
    
    const [{ rows: totalSales }, { rows: soldItems }, { rows: unsoldItems }] = await Promise.all([
      db.query(totalSalesQuery, [month]),
      db.query(soldItemsQuery, [month]),
      db.query(unsoldItemsQuery, [month])
    ]);
    res.json({ totalSales: totalSales[0].totalsales, soldItems: soldItems[0].solditems, unsoldItems: unsoldItems[0].unsolditems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Bar Chart Data
app.get('/api/bar-chart', async (req, res) => {
  try {
    const { month } = req.query;
    const query = `SELECT 
      CASE 
        WHEN price BETWEEN 0 AND 100 THEN '0-100'
        WHEN price BETWEEN 101 AND 200 THEN '101-200'
        WHEN price BETWEEN 201 AND 300 THEN '201-300'
        WHEN price BETWEEN 301 AND 400 THEN '301-400'
        WHEN price BETWEEN 401 AND 500 THEN '401-500'
        WHEN price BETWEEN 501 AND 600 THEN '501-600'
        WHEN price BETWEEN 601 AND 700 THEN '601-700'
        WHEN price BETWEEN 701 AND 800 THEN '701-800'
        WHEN price BETWEEN 801 AND 900 THEN '801-900'
        ELSE '901-above'
      END AS priceRange, COUNT(*) AS count 
    FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 
    GROUP BY priceRange`;
    const { rows } = await db.query(query, [month]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Pie Chart Data
app.get('/api/pie-chart', async (req, res) => {
  try {
    const { month } = req.query;
    const query = 'SELECT category, COUNT(*) AS count FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 GROUP BY category';
    const { rows } = await db.query(query, [month]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Combined API Data
app.get('/api/combined', async (req, res) => {
  try {
    const { month } = req.query;
    const [transactions] = await db.query('SELECT * FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1', [month]);
    const [statistics] = await db.query('SELECT SUM(price) AS totalSales, COUNT(CASE WHEN sold THEN 1 END) AS soldItems, COUNT(CASE WHEN NOT sold THEN 1 END) AS unsoldItems FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1', [month]);
    const [barChartData] = await db.query('SELECT CASE WHEN price BETWEEN 0 AND 100 THEN "0-100" ELSE "501-above" END AS priceRange, COUNT(*) AS count FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 GROUP BY priceRange', [month]);
    const [pieChartData] = await db.query('SELECT category, COUNT(*) AS count FROM transactions WHERE EXTRACT(MONTH FROM dateofsale) = $1 GROUP BY category', [month]);
    res.json({ transactions, statistics, barChartData, pieChartData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
