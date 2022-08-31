import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"


// //  😊😊  SignUp Form Started 😘😘


const RegisterUser = async (req, res, next) => {
    let { name, email, password } = req.body

    const SALT_ROUND = 10
    bcrypt.hash(password, SALT_ROUND, async (err, hash) => {
        if (err) {
            return (
                res.status(500).json({
                    msg: `${err}`
                })
            )
        } else {
            await User.create({
                name, email, password: hash,
            }).then((result) => {
                res.status(201).json({
                    success: true,
                    email: result.email,
                    name: result.name,
                    password: result.name,
                    createdAt: result.createdAt,
                    message: "😲😲😲 Registeration Successful 😲😲😲 "
                })
            }).catch((err) => {
                if (err.name === "MongoServerError") {
                    return res.status(500).json({
                        message: "User All Ready Exist"
                    })
                }
                res.status(500).json({
                    message: err.message
                })
            });
        }
    })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignUp Form Ended 🙋🏻‍♀️🙋🏻‍♀️


// //  😊😊  SignIn Form Started 😘😘

const Login = async (req, res, next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return (
            next(new ErrorHandler("Please Enter Email && Password !", 400))
        )
    }


    const userFound = await User.findOne({ email })
        .then(async (user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    const token = jsonwebtoken.sign(
                        {
                            email,
                            name: user.name,
                            id: user._id
                        },
                        "Hello World",
                        {
                            expiresIn: "2d"
                        }
                    )

                    res.cookie('authToken', token, {
                        expires: new Date(
                            Date.now() + 2 * 24 * 60 * 60 * 1000),
                        httpOnly: false,
                        maxAge: 120 * 60 * 60 * 1000,
                        sameSite:"none",
                        secure:true
                    })


                    res.status(200).json({
                        token,
                        email,
                        name: user.name,
                        createdAt: user.createdAt,
                        message: "Login Successfull",

                    })



                }
                if (!result) {
                    res.status(401).json({
                        msg: "Email or Password not matched ",
                    })
                }


            })
        }).catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignIn Form Ended 🙋🏻‍♀️🙋🏻‍♀️

///// Load User 

const GetUserDetail = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

}


const Logout = async (req, res, next) => {
    res
        .clearCookie("authToken",{
            sameSite:"none",
            secure:true           })
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}

export {
    RegisterUser, Login, GetUserDetail,Logout
}