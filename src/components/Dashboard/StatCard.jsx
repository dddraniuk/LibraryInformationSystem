import React from 'react';
import Card from '../UI/Card';
import './StatCard.css';

function StatCard({ title, value, description, icon, color }) {
  return (
    <Card>
      <div className="stat-card">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <h2 className="stat-value">{value}</h2>
          <span className="stat-description">{description}</span>
        </div>

        <div className={`stat-icon ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;