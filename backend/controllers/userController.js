import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Does't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credemtials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    // checking user exists
    try {
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new userModel({
            name: name,
            email: email,
            password: hashedpassword
        })

        const user = await newuser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }