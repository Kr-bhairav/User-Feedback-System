import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './FeedbackDashboard.css';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/feedback?category=${filter}&sort=${sortOrder}`);
        setFeedbacks(res.data.feedbacks ? res.data.feedbacks : res.data || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
        setFeedbacks([]);
      }
    };
    fetchData();
  }, [filter, sortOrder]);

  const categoryData = feedbacks.reduce((acc, fb) => {
    const cat = fb.category || 'Unknown';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([key, value]) => ({
    name: key,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BD4'];

  return (
    <div className="dashboard-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h2>Feedback Dashboard</h2>

      <div className="filter-controls">
        <div>
          <label>Filter by Category:</label><br />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option>General</option>
            <option>Suggestion</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
          </select>
        </div>

        <div>
          <label>Sort:</label><br />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="chart-container" style={{ width: '100%', height: 300 }}>
        <h3>Feedback Distribution by Category</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="feedback-list">
        {feedbacks.map((fb) => (
          <li key={fb._id} className="feedback-item">
            <strong>{fb.name}</strong> ({fb.email}) - <em>{fb.category}</em>
            <p>{fb.message}</p>
            <small>{new Date(fb.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDashboard;
