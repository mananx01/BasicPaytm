const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const z = require("zod");

const { user, account } = require("../db");
const { JWT_SECRET } = require("../config");
const { usermiddleware } = require("../middlewares/usermiddleware")

const userobject = z.object({
    username: z.string().min(3).max(30).nonempty(),
    firstname: z.string().max(30).trim().nonempty(),
    lastname: z.string().max(30).trim(),
    password: z.string().min(6).nonempty(),
});

const updatebody = z.object({
    newfirstname: z.string().optional(),
    newlastnam: z.string().optional(),
    password: z.string().optional()
})


router.post("/signup", async (req,res) => { 

    const obj = req.body;
    const status  = userobject.safeParse(obj);

    if(!status.success) {
        return res.status(402).json({
            msg: "Invalid Inputs !"
        })
    }
    else{

        const user1 = await user.findOne({username: obj.username})
        
        if(user1) {
            return res.status(411).json({
                msg: "Username already exists !"
            })
        }
        else{

            const currentuser = await user.create(obj)
            const userid = currentuser._id;

            const accountdata = await account.create({
                userid,
                balance: 100 + Math.random()*10000000
            })  

           
            var token = jwt.sign({userid: userid} , JWT_SECRET);
            return res.json({
                msg: "user created succesfully !",
                token: token,
                balance: accountdata.balance,
                id: userid, 
            })
        

        }
    }

})



router.post("/signin", usermiddleware, (req,res) => { 

    const userid = req.body.userid;

    const requsername = req.body.username;
    const reqpassword = req.body.password;


    user.findOne({_id: userid})
    .then((user1) => {

        if(!user1){
            return res.status(404).json({
                msg: "user not found"
            })
        }
        else{
            if(user1.username === requsername && user1.password === reqpassword) {
                
                return res.json({
                    msg: `${user1.username} signed-in`,
                    id: userid,
                    name: user1.username,
                })
            }  
            else{
                return res.status(401).json({
                    msg: "incorrect credentials"
                })
            } 
        }

        
    })

})


router.put("/update", usermiddleware, async (req,res) => { 

    const userid = req.body.userid;
    const newfirstname = req.body.newfirstname;
    const newlastname = req.body.newlastname;
    const newpassword = req.body.newpassword;

    const isValid = updatebody.safeParse(req.body);

    if(isValid.success) {
        
        await user.updateOne({_id: userid},{
            '$set' : {
                firstname: newfirstname,
                lastname: newlastname,
                password: newpassword,
            } 
        })

        res.json({
            msg: `${userid} user updated`
        })
    }
    else{
        res.json({
            msg : "invalid inputs !"
        })
    }
   

})


router.get("/filterusers", usermiddleware , (req,res) => {

    const filterval = req.query.filter;

    user.find({
        $or: [
            {
                firstname: {
                    "$regex": filterval
                }
            },{
                lastname: {
                    "$regex": filterval
                }
            }
        ]
    })
    .then((userarr) => {

        const filteredusers = userarr.map(user => {
            return {
                userid: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }
        })
    
        res.json({
            filteredusers
        })
    
    })


})


router.get("/getuserdata", usermiddleware, async (req,res)=>{

    const id = req.body.userid;

    const curruser = await user.findOne({_id: id});  
    const curruseracc = await account.findOne({userid: id});

    console.log("id" + id);

    if(curruser && curruseracc) {

        res.json({
            firstname: curruser.firstname,
            lastname: curruser.lastname,
            balance: curruseracc.balance,
            bankaccountid: curruseracc._id,
        })

    }
    else if(curruser && !curruseracc){ 
        res.status(411).json({
            msg: "users account does not exist"
        })
    }
    else{
        res.status(404).json({
            msg: "user not found "
        })
    }


});


module.exports = router;