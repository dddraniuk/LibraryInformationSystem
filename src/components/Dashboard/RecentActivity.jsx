
import React from 'react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import './RecentActivity.css';

function RecentActivity({ activities }) {
  const recentActivities = activities.slice(0, 5);

  return (
    <Card title="Останні операції">
      <div className="activity-list">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <div className="activity-info">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <span>{activity.date}</span>
              </div>

              <Badge
                variant={
                  activity.type === 'Видача'
                    ? 'warning'
                    : 'success'
                }
              >
                {activity.type}
              </Badge>
            </div>
          ))
        ) : (
          <p>Операцій поки немає.</p>
        )}
      </div>
    </Card>
  );
}

export default RecentActivity;
