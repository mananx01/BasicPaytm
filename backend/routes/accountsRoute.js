const express = require("express");
const router = express.Router(); 
const mongoose = require("mongoose");

const {user, account} = require("../db");
const { usermiddleware } = require("../middlewares/usermiddleware")


router.get('/balance', usermiddleware, async (req,res)=> {

    const id = req.body.userid;
    const useraccount = await account.findOne({userid: id})

    res.json({
        balance: useraccount.balance
    })

})


router.post('/transfer', usermiddleware, async (req,res)=>{ 


    const session = await mongoose.startSession();
    session.startTransaction(); 

    const {amount, to} = req.body;

    const userid = req.body.userid; 
    const fromAccount = await account.findOne({userid: userid}).session(session);

    if(amount == 0 || !amount) {
        await session.abortTransaction();
        return res.status(411).json({
            msg: "Please enter some amount !"
        })
    }


    if(!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient Balance !"
        })
    }


    const toAccount = await account.findOne({userid: to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "account does not exist"
        })
    }

    await account.updateOne({userid: userid},{
        $inc: {
            balance: -amount
        }
    }).session(session);

    await account.updateOne({userid: to}, {
        $inc: {
            balance: amount 
        }
    }).session(session);


    
    await session.commitTransaction(); 

    res.json({
        msg: "Transaction Successful !!"
    })

})



module.exports = router;
