const express = require("express")
const router = express.Router()
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth")

const User = require("../models/User")

const isRequiredField = (field, res, message) => {
    if (!field) {
        return res.status(400).json({ success: false, message: message })
    }
}

// @route GET api/auth
// @desc Check if user is logged
// @access Public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
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

    // Simple  validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing username or password" })
    }

    isRequiredField(email, res, "Email is required")
    isRequiredField(fullName, res, "FullName is required")
    isRequiredField(address, res, "Address is required")
    isRequiredField(gender, res, "Gender is required")

    try {
        //Check for existing user
        const user = await User.findOne({ username })
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" })
        }

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            address,
            gender,
            roleId: roleId || "R3",
            phoneNumber: phoneNumber || "",
            positionId: positionId || "P0",
            image: image || "",
        })
        await newUser.save()

        // Return verifyToken
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: "User has been created",
            accessToken: accessToken,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

// @route POST apt/auth/login
// @desc login user
// @access Public
router.post("/login", async (req, res) => {
    const { username, password } = req.body

    // Simple validate
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing username or password" })
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            })
        }

        // User found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            })
        }

        // All good
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: "User logged successfully",
            accessToken: accessToken,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" })
    }
})

module.exports = router
