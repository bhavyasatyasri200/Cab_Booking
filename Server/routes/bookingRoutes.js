const express = require('express');
const router = express.Router();
const {
  bookCab,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  deleteOrphanedBookings,
} = require('../controllers/bookingController');
const { authUser, authAdmin } = require('../middlewares/authMiddleware');

router.post('/', authUser, bookCab);
router.get('/user', authUser, getUserBookings);
router.get('/all', authAdmin, getAllBookings);
router.put('/:id/status', authAdmin, updateBookingStatus);
router.delete('/orphaned', authAdmin, deleteOrphanedBookings);
router.delete('/:id', authAdmin, deleteBooking);

module.exports = router;
