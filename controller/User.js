var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // `name` must be unique and of type String
  name: {
    type: String,
    unique: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  isCool: {
    type: Boolean,
    default: false
  }
});

// Refer to Mongoose's documentation for their model method: https://mongoosejs.com/
var User = mongoose.model("User", UserSchema);
module.exports = User;
