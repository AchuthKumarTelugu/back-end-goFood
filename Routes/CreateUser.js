const express = require('express')
const router = express.Router()
const user = require('../models/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');


const jwt = require('jsonwebtoken')
const jwt_secretKey = "ajdfjadkjfajdfljldkj"
router.post('/create_user',
    [body('email', "Incorrect email format").isEmail(), body('password', 'incorrect password').isLength({ min: 5 }), body('name', 'user cant be empty').notEmpty()],           //adding validators
    async (req, res) => {
        const errors = validationResult(req);  //checking validation results
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)
        try {
            //to create user
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptedPassword,
                location: req.body.location
            })
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false })
        }
    })
router.post('/loginuser', async (req, res) => {
    try {
        const { email, password } = req.body
        let userData = await user.findOne({ email })
        if (!userData) {
            return res.status(401).json({ message: "Try logging with valid email" });
        }
        const userPassword = userData.password
        console.log(password)
        console.log(userPassword)
        let data = {
            user: {
                id: userData.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secretKey, { expiresIn: '6h' })
        if (await bcrypt.compare(password, userPassword)) {
           
            res.status(200).json({ success: true, authtoken: authtoken })
        } else {
            return res.status(401).json({ message: "Try logging with valid password" });
        }
    } catch (error) {
        console.log(error)
    }

})
module.exports = router