import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaperCard.css';

const PaperCard = ({ paper }) => {
  return (
    <Link to={`/paper/${paper.id}`} className="paper-card-link">
      <div className="paper-card">
        <h3 className="paper-title">{paper.title}</h3>
        {paper.authors && (
          <p className="paper-authors">Authors: {paper.authors}</p>
        )}
        {paper.year && (
          <p className="paper-year">Year: {paper.year}</p>
        )}
        {paper.abstract && (
          <p className="paper-abstract">{paper.abstract.substring(0, 150)}...</p>
        )}
        <div className="paper-card-footer">
          <span className="read-more">Read More →</span>
        </div>
      </div>
    </Link>
  );
};

export default PaperCard;
