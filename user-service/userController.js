// userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database

    // Emit "User Registered" event
    eventBus.emit('User Registered', { userId: newUser.id });

    res.json({ token });
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'jwtSecret');
    res.json({ token });
};
