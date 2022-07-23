import express from "express"
import {createHotel, deleteHotel, getHotel, getHotells, updateHotel} from "../controllers/hotel.js";

const router = express.Router()

// CREATE
router.post('/', createHotel)
// UPDATE
router.put('/:id', updateHotel)
// DELETE
router.delete('/:id', deleteHotel)
// GET
router.get('/:id', getHotel)
// GET ALL
router.get('/', getHotells)

export default router