const Car = require('../models/CarSchema');

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCar = async (req, res) => {
  try {
    const { drivername, carname, cartype, price, carno } = req.body;
    const carImage = req.file ? req.file.filename : '';
    const car = await Car.create({ drivername, carImage, carname, cartype, price, carno });
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { drivername, carname, cartype, price, carno } = req.body;
    const updateData = { drivername, carname, cartype, price, carno };
    if (req.file) updateData.carImage = req.file.filename;

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllCars, getCarById, addCar, updateCar, deleteCar };
