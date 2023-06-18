const express = require("express");
const jwt = require('jsonwebtoken');
const {
  createUser,
  login,
  userList
} = require("../controllers/UserController");

const router = express.Router();
 
function auth(req,res,next){
  if(req.query.Authorization) {
      token = req.query.Authorization;
      jwt.verify(token, "access",(err,user)=>{
          if(!err){
              req.user = user;
              next();
          }
          else{
              return res.status(403).json({message: "User not authenticated"})
          }
       });
   } else {
       return res.status(403).json({message: "User not logged in"})
   }
}

router.route("/login").post(login);
router.route("/").post(createUser);
router.route("/list").get(auth,userList);



module.exports = router;