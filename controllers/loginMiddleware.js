const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.headers['auth-token'];
  // const token = await req.headers['authorization'];
  const token = req.headers;
  // const token = await req.headers.authorization;
  let authHeader = req.header('Authorization');
  // let sessionID = authHeader.split(' ')[1];

  // res.send(token);
  console.log(token);
  // console.log(req.headers);

  //   if (!token) {
  //     const errors = [
  //       {
  //         msg: "Login First"
  //       }
  //     ];
  //     res.render("login", {
  //       errors
  //     });
  //   } else {
  next();
  //   }

  // try {
  // const verified = jwt.verify(token, "asdqweasdqwrsawrsdfwer");
  // req.user = verified;
  // next();
  // } catch (error) {
  //     res.status(400).send("Invalid token !!");
  // }
};