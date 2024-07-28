const express = require("express");
const app = express();
const cors = require("cors");
const userrouter = require("./routes/userroutes");
const accountsrouter = require('./routes/accountsRoute');

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userrouter);
app.use('/api/v1/account', accountsrouter);


app.listen(3000, ()=> {
    console.log("event listening at port 3000");
})


