const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { authUser, authAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.get('/profile', authUser, getProfile);

// Admin: manage users
router.get('/all', authAdmin, getAllUsers);
router.put('/:id', authAdmin, updateUser);
router.delete('/:id', authAdmin, deleteUser);

module.exports = router;
