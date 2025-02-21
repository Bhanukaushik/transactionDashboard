// src/components/Pagination.jsx
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        Previous
                    </button>
                </li>
                <li className="page-item disabled">
                    <span className="page-link">
                        Page {currentPage} of {totalPages > 0 ? totalPages : 1}
                    </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
