import express from "express"
import { GetUserDetail, Login, RegisterUser,Logout } from "../controller/userController.js"
import checkToken from "../middleware/Auth.js"
const UserRoute = express.Router()

UserRoute.route("/signUp").post(RegisterUser)
UserRoute.route("/signIn").post(Login)
UserRoute.route("/userDetail").get(checkToken, GetUserDetail)
UserRoute.route("/logout").get(checkToken,Logout)

export default UserRoute