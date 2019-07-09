const express = require('express');

const db = require('./db');

const router = express.Router();

router.use(express.json());

// Get all posts
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

// Get single post by id
router.get('/:id', async (req, res) => {
  console.log(`hit /:id with ${req.id}`);
  try {
    const post = await db.findById(req.params.id);

    if (post && post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the requested post',
    });
  }
});

// Add a post
router.post('/', async (req, res) => {
  try {
    const post = await db.insert(req.body);
    console.log('post body: ', req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: 'There was an error adding the post',
    });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await db.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({
        message: 'The post you want to update cannot be found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error updating the post',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postId = await db.remove(req.params.id);
    if (postId > 0) {
      res.status(200).json({
        message: 'This post was successfully deleted',
      });
    } else {
      res.status(404).json({
        message: 'The post you want to delete cannot be found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There was an error deleting the post',
    });
  }
});

module.exports = router;
