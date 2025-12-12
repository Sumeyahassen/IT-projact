const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json([])); // will be replaced later with real data
module.exports = router;
