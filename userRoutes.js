const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUserInfo} = require("../controllers/userController"); 

//router.use(express.json());
const validateToken = require("../middleware/validateTokenHandler");
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, currentUserInfo);

module.exports = router;