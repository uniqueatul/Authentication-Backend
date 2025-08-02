
const bcrypt = require('bcrypt');

const User = require('../models/User'); 

exports.signup= async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', });
        }   

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({  success: false , message: 'Error hashing password', });
        }
 const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({ success: true, message: 'User created successfully', user });
    }
        
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }   
}
