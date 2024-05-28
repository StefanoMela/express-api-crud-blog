const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const multer = require('multer');
const uploader = multer({dest: 'public/img'})

router.get('/', postController.index);

router.post('/create/', uploader.single('image'), postController.create)

router.get('/:slug', postController.show)

router.delete('/:slug', postController.destroy);

router.get('/:slug/download', postController.download)

module.exports = router;