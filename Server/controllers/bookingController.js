const MyBooking = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');
const User = require('../models/UserSchema');

// Book a cab
const bookCab = async (req, res) => {
  try {
    const {
      selectedPickupCity, selectedPickupState, selectedDropCity,
      pickupdate, pickuptime, dropdate, droptime,
      fare, cartype, carname, carno,
    } = req.body;

    const user = await User.findById(req.user.id);

    const booking = await MyBooking.create({
      selectedPickupCity, selectedPickupState, selectedDropCity,
      pickupdate, pickuptime, dropdate, droptime,
      fare, cartype, carname, carno,
      userid: req.user.id,
      userName: user ? user.name : 'Unknown User',
      userEmail: user ? user.email : '',
      status: 'Pending',
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings of logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await MyBooking.find({ userid: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await MyBooking.find().populate('userid', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status (admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Confirmed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await MyBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userid', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete single booking (admin)
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await MyBooking.findByIdAndDelete(id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all bookings from deleted users (admin)
const deleteOrphanedBookings = async (req, res) => {
  try {
    // Find all valid user IDs
    const existingUsers = await User.find().select('_id');
    const validUserIds = existingUsers.map(u => u._id);

    // Delete bookings where userid is not in validUserIds OR userid is null
    const result = await MyBooking.deleteMany({
      $or: [
        { userid: { $nin: validUserIds } },
        { userid: null }
      ]
    });

    res.json({ message: `${result.deletedCount} deleted user bookings removed.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  bookCab,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  deleteOrphanedBookings,
};
