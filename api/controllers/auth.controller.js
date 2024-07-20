import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'Please provide username, email and password!'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({message: 'User created successfully!'});
    } catch (err) {
        next(err);
    }
    
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'Please provide email and password!'));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {    
            return next(errorHandler(404, 'User not found!'));
        } else {    
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                return next(errorHandler(401, 'Invalid credentials!'));
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            const {password: p, ...others} = user._doc

            res.status(200).cookie('token', token, { httpOnly: true }).json({ others });
        }
    } catch (err) {
        next(err);
    }
}

export const googleAuth = async (req, res, next) => {
    const { email, name, googlePhotoURL } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const {password: p, ...others} = user._doc
            res.status(200).cookie('token', token, { httpOnly: true }).json({ others });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                googlePhotoURL
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const {password: p, ...others} = newUser._doc
            res.status(200).cookie('token', token, { httpOnly: true }).json({ others });
        }
    } catch (err) {
        next(err);
    }
}