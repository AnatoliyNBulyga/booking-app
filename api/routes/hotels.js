import express from "express"
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel
} from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verify.js";

const router = express.Router()

// CREATE
router.post('/', verifyAdmin, createHotel)
// UPDATE
router.put('/:id', verifyAdmin, updateHotel)
// DELETE
router.delete('/:id', verifyAdmin, deleteHotel)
// GET
router.get('/find/:id', getHotel)
// GET ALL
router.get('/', getHotels)
// Others
router.get('/count-by-city', countByCity)
// router.get('/count-by-city', countByCity)
router.get('/count-by-type', countByType)

export default router