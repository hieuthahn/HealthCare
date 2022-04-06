const express = require("express")
const router = express.Router()
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
// const verifyToken = require()

const User = require("../models/User")

const isRequiredField = (field, res, message) => {
    if (!field) {
        return res.status(400).json({ success: false, message: message })
    }
}

router.get("/", (req, res) => {
    res.send("auth")
})

// @route POST apt/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    const {
        username,
        password,
        email,
        fullName,
        address,
        gender,
        roleId,
        phoneNumber,
        positionId,
        image,
    } = req.body
    res.send("hello")
    // Simple  validation
    // if (!username || !password) {
    //     return res
    //         .status(400)
    //         .json({ success: false, message: "Missing username or password" })
    // }
    // isRequiredField(email, res, "Email is required")
    // isRequiredField(fullName, res, "FullName is required")
    // isRequiredField(address, res, "Address is required")
    // isRequiredField(gender, res, "Gender is required")

    try {
        //Check for existing user
        const user = await User.findOne({ username })

        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" })
        }

        // All good
        const hashedPassword = await argon2.hosh(password)
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            address,
            gender,
            roleId,
            phoneNumber,
            positionId,
            image,
        })
        // await newUser.save()

        // // Return verifyToken
        // const accessToken = jwt.sign(
        //     {
        //         userId: newUser._id,
        //     },
        //     process.env.ACCESS_TOKEN_SECRET
        // )

        // return res.json({
        //     success: true,
        //     message: "User has been created",
        //     accessToken: accessToken,
        // })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

module.exports = router
