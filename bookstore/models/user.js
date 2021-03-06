var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: String,
  fName: String,
  lName : String,
  gender : String,
  moblieNo : String,
  password: String
});


module.exports= mongoose.model("User",UserSchema);
