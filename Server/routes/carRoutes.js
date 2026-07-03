const express = require('express');
const router = express.Router();
const { getAllCars, getCarById, addCar, updateCar, deleteCar } = require('../controllers/carController');
const { authAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', authAdmin, upload.single('carImage'), addCar);
router.put('/:id', authAdmin, upload.single('carImage'), updateCar);
router.delete('/:id', authAdmin, deleteCar);

module.exports = router;
