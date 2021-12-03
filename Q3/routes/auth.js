import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User.js';

const router = express.Router()

// Register

router.post('/register', async (req, res) => {
    try {
        let user;

        user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.status(409).json({ status: "USER ALREADY EXISTS", user_id: null });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({
            display_name: req.body.display_name,
            username: req.body.username,
            password: hashedPassword,
            token: crypto.randomBytes(32).toString("hex")
        })
        await user.save();
        res.status(200).json({ status: "USER_CREATED", user_id: user._id });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Login

router.post('/login', async (req, res) => {
    try {
        let user;

        user = await User.findOne({ username: req.body.username })

        if (user.isLoggedIn) {
            return res.status(403).json({ token: null, status: "NOT AUTHENTICATED" });
        }

        const verifyPassword = await bcrypt.compare(req.body.password, user.password);

        if (!verifyPassword) {
            return res.status(401).json({ token: null, status: "NOT AUTHENTICATED" });
        }

        user.isLoggedIn = true;
        await user.save();
        res.status(200).json({ username: user.username, display_name: user.display_name, token: user.token, TTL: user.TTL });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Verify

router.post('/verify', async (req, res) => {
    try {
        let user;

        user = await User.findOne({ token: req.body.token });

        if (!user) {
            return res.status(400).json({ status: "inValid", is_valid: false });
        }

        res.status(200).json({ status: "Valid", is_valid: true, TTL: user.TTL, display_name: user.display_name, username: user.username });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Logout

router.post('/logout/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({status: "You are not logged in."});
        }
        user.isLoggedIn = false;
        await user.save();
        res.status(200).json({status: "User logged out."});
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;