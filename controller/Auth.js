 
const bcrypt = require('bcrypt');

const user = require("../models/User");

exports.signup = async(req , res) => {
    try{
        //fetch data from request body
        const {name , email , password , role} = req.body;


          //check if user already exists
        const existingUser = await user.findOne({email});

        //If user exists, return error
        if(existingUser) {
            return 
            res.status(400).json({
                success: false,
                message: 'user already exists',
            });
        }
       //hash password
        let hashedPassword;
        try{
            //hash password using bcrypt
            hashedPassword = await bcrypt.hash(password , 10);
        }
        
        catch(error) {
            return res.status(500).json({
                success: false,
                message: 'error hashing password',
            });
        }
        // insert user into database
        const user = await user.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        //return success response
        return res.status(200).json({
            success: true,
            message: 'user created successfully',
            
        });

    }

    //catch errors
    catch(err) {
        console.error('error during signup:' , err);
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        });

    }
}

 

