const { registerUser, authenticateUser } = require('../auth/authService');
const kafkaProducer = require('../events/kafkaProducer');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = await registerUser(username, email, password);

        kafkaProducer('UserRegistered', { userId: newUser._id, email: newUser.email });

        res.status(201).json({ message: 'User registered', userId: newUser._id });
    } catch (error) {
        console.error('Registration error:', error); // Enhanced error logging
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authenticateUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message });
    }
};
