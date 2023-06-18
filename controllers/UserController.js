const userService = require("../services/UserService");
const jwt = require('jsonwebtoken');

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = async (username,password)=>{
  const user = await userService.getUserByUserName(username);
  // let validusers = users.filter((user)=>{
  //   return (user.username === username && user.password === password)
  // });
  if(user.length > 0){
    return true;
  } else {
    return false;
  }
}

exports.login = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (await authenticatedUser(userName,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 });

    // req.session.authorization = {
    //   accessToken,userName
    // }
  return res.status(200).send({accessToken});
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
}
exports.createUser = async (req, res) => {

  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (userName && password) {
        if (userName) {  // implement doesExist
        // users.push({"username":username,"password":password});
        const user = await userService.createUser(req.body);
        return res.status(200).json({ data: user, status: "success" });
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    }
    return res.status(404).json({message: "Unable to register user."});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.userList = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res = res.json({ data: users, status: "success" });
    // console.log(res, "resresresres")
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};