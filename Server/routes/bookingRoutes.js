const express = require('express');
const router = express.Router();
const { bookCab, getUserBookings, getAllBookings } = require('../controllers/bookingController');
const { authUser, authAdmin } = require('../middlewares/authMiddleware');

router.post('/', authUser, bookCab);
router.get('/user', authUser, getUserBookings);
router.get('/all', authAdmin, getAllBookings);

module.exports = router;
