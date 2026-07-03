const mongoose = require('mongoose');

const MyBookingSchema = new mongoose.Schema({
  selectedPickupCity: { type: String, required: true },
  selectedPickupState: { type: String, required: true },
  selectedDropCity: { type: String, required: true },
  pickupdate: { type: String, required: true },
  pickuptime: { type: String, required: true },
  dropdate: { type: String, required: true },
  droptime: { type: String, required: true },
  fare: { type: String, required: true },
  cartype: { type: String },
  carname: { type: String },
  carno: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookeddate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN'),
  },
}, { timestamps: true });

const MyBooking = mongoose.model('MyBooking', MyBookingSchema);
module.exports = MyBooking;
