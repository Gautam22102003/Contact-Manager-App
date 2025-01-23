const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"PLEASE ADD USERNAME"],
    },
    email:{
        type: String,
        required:[true, "Please Add Email"],
        unique:[true,"Email already in use"],
    },
    password:{
        type: String,
        required:[true, "Please add Password"],
    }
    
},{
    timestamps : true,
}
);

module.exports = mongoose.model("User",userSchema);