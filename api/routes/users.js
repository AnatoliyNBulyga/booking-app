import express from "express"
import {deleteUser, getUser, getUsers, updateUser} from "../controllers/user.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verify.js";

const router = express.Router()

// router.get('/authenticate', verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in!")
// })
//
// router.get('/authenticate/:id', verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete you account")
// })
//
// router.get('/authenticate-admin', verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete you account")
// })

// UPDATE
router.put('/:id', verifyUser, updateUser)
// DELETE
router.delete('/:id', verifyUser, deleteUser)
// GET
router.get('/:id', verifyUser, getUser)
// GET ALL
router.get('/', verifyAdmin, getUsers)

export default router