import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css'; 

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    category: 'General'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', form);
      alert('Feedback submitted successfully!');
      setForm({ name: '', email: '', message: '', category: 'General' });
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Feedback</h2>
      <button
        className="dashboard-button"
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </button>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Feedback</label>
          <textarea name="message" className="form-control" value={form.message} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={form.category} onChange={handleChange}>
            <option>General</option>
            <option>Suggestion</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
