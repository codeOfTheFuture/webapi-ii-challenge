const express = require('express');

const db = require('./db');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There was an error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {});

router.post('/', async (req, res) => {});

router.put('/:id', async (req, res) => {});

router.delete('/:id', async (req, res) => {});

module.exports = router;
