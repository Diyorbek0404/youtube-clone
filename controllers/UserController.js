import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const generateJwt = (id, email, username, role) => {
    return jwt.sign(
        { id, email, username, role }, 'randomkey'
    )
}
class UserController {
    async registration(req, res, next) {
        const { email, password, role, username } = req.body
        if (!email || !password || !username) {
            return next(ApiError.badRequest("email yoki parol yoki foydalanuvchi nomi kiritilmagan"))
        }
        const userFind = await User.findOne({ email: email })
        if (userFind) {
            return next(ApiError.badRequest("Bu foydalanuvchi avval ro'yxatdan o'tgan"))
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({ email, username, role, password: hashPassword })
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.send({user, token})
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return next(ApiError.internal("bunday foydalanuvchi topilmadi"))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest("Parol xato"))
        }
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.send({token, user})
    }

    async check(req, res, next) {
        const token = generateJwt(id, email, role, username)
        return res.json({ token })
    }
}

export default new UserController
