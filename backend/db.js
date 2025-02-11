const mongoose = require("mongoose");
mongoose.connect("your_mongo_db_url");


const userSchema = new mongoose.Schema({

    username: String,
    firstname: String,
    lastname: String,
    password: String,

})

const accountSchema = new mongoose.Schema({
   
    userid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
}) 


const account = mongoose.model("account", accountSchema);
const user = mongoose.model("user", userSchema);

module.exports = {
    user,
    account
}
