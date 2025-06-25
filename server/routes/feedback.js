const express = require('express');
const router = express.Router();
const Feedback = require('../model/Feedback');

router.post('/', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, sort } = req.query;
    let filter = category ? { category } : {};
    let sortOption = { createdAt: sort === 'asc' ? 1 : -1 };

    const feedbacks = await Feedback.find(filter).sort(sortOption);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
