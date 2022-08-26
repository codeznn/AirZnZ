// backend/routes/index.js

const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

// // test hello world
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
