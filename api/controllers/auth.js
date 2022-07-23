import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8)
      const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
      })
      await newUser.save()
      res
          .status(200)
          .send("User has been created.")
    } catch(err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return next(createError(401, 'Unauthorized!'))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(401, 'Unauthorized!'))
        }
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_JWT_SECRET, { expiresIn: process.env.ACCESS_JWT_EXPIRATION })
        const {password, ...secureUser} = user._doc
        res
            .cookie("access_token", token, {httpOnly: true, maxAge: process.env.ACCESS_JWT_EXPIRATION})
            .status(200)
            .json({...secureUser})
    } catch(err) {
        next(err)
    }
}