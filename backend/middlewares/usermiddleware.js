const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


function usermiddleware (req,res,next) {

    const token = req.headers.authorization;

    if(token) {
        
        const tokenarr = token.split(" ");    
        const finaltoken = tokenarr[1];

        var check = jwt.verify(finaltoken, JWT_SECRET);

        if(check) {

            var decoded = jwt.decode(finaltoken, JWT_SECRET);
            if(decoded.userid) {
                req.body.userid = decoded.userid;
                next();
            }
            else{
                res.status(401).json({
                    msg: "userid not defined"
                })
            }
            
        }
        else{
            res.status(401).json({
                msg: "invalid token"
            })
        }
    }
    else{
        res.status(401).json({
            msg: "token not given"
        })
    }

    

}


module.exports = {usermiddleware}