const mongoose = require("mongoose");
const serverMongo = process.env.SERVERMONGO || "mongodb://root:example@localhost:27017/";
mongoose.connect(serverMongo);
const User = require("../model/user");

const verify = async (username, password, done) => {
  const user = await User.findOne({ username });
  console.log('-----------------')
  console.log(user)
  console.log('-----------------')
  if (!user) {
    return done(null, false);
  } else if (user.password !== password) {
    return done(null, false);
  } else {
    return done(null, user)
  }


  //   db.users.findByUsername(username, (err, user) => {
  //     if (err) {
  //       return done(err);
  //     }
  //     if (!user) {
  //       return done(null, false);
  //     }
  //     if (!db.users.verifyPassword(user, password)) {
  //       return done(null, false);
  //     }
  //     return done(null, user);
  //   });
};

module.exports = verify;
