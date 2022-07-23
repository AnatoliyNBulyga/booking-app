import {createError} from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    console.log('token ', token)
    if (!token) {
        return next(createError(401, "Unauthorized!"))
    }
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.user = user
        return next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            return next()
        }
        return next(createError(403, "Unauthorized!"))
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            return next()
        }
        return next(createError(403, "Unauthorized!"))
    })
}