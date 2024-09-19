const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../auth");

module.exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: "Invalid credentials" });

        const token = createAccessToken(user);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
