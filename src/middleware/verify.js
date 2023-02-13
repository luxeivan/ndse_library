const mongoose = require("mongoose");
const serverMongo = process.env.SERVERMONGO || "mongodb://root:example@localhost:27017/";
mongoose.connect(serverMongo);
const User = require("../../model/user");

const verify = async (username, password, done) => {
  const user = await User.find({ username });
  console.log(user)
  if (!user) {
    return done(null, false);
  }


  db.users.findByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!db.users.verifyPassword(user, password)) {
      return done(null, false);
    }
    return done(null, user);
  });
};

module.exports = verify;
