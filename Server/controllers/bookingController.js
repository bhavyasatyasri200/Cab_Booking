const MyBooking = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');

// Book a cab
const bookCab = async (req, res) => {
  try {
    const {
      selectedPickupCity, selectedPickupState, selectedDropCity,
      pickupdate, pickuptime, dropdate, droptime,
      fare, cartype, carname, carno,
    } = req.body;

    const booking = await MyBooking.create({
      selectedPickupCity, selectedPickupState, selectedDropCity,
      pickupdate, pickuptime, dropdate, droptime,
      fare, cartype, carname, carno,
      userid: req.user.id,
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

module.exports = { bookCab, getUserBookings, getAllBookings };
