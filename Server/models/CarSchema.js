const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  drivername: { type: String, required: true },
  carImage: { type: String, default: '' },
  carname: { type: String, required: true },
  cartype: { type: String, required: true }, // Mini, Sedan, SUV
  price: { type: String, required: true },
  carno: { type: String, required: true },
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
