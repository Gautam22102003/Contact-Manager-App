const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
//const salt = bcrypt.genSaltSync(10);
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/resgister
//@access PUBLIC
const registerUser = asyncHandler(async(req,res) =>{
    const {username, email , password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({message: "Please fill out all details"});
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedpw = await bcrypt.hash(password,10);
    //console.log("Hashed password : ", hashedpw);
    const user = await User.create({username,
                                    email,
                                    password:hashedpw,
                                });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else {
        res.status(400);
        throw new Error("User data invalid");
    }
    //res.json({message:"Register the User"});
});

//@desc user LOGIN
//@route POST /api/users/resgister
//@access PUBLIC
const loginUser = asyncHandler(async(req,res) => {
    const { username,email, password} = req.body;
    if( !username || !password || !email){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
    );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Password incorrect!");
    }
    
})

//@desc current user info
//@route GET /api/users/resgister
//@access private
const currentUserInfo = asyncHandler(async(req,res) => {
    res.json(req.user);
})
module.exports = {registerUser,loginUser, currentUserInfo};