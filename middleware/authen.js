const jwt =require("jsonwebtoken")

const fs = require("fs")


const authentication = (req,res,next)=>{
    const token= req.headers.authorization;
    if (token){
        const data= JSON.parse(fs.readFileSync("./blacklisted.json","utf-8"))
        if(data.includes(token)){
            res.status(400).send("login Again !!!")
        }
        const decoded= jwt.verify(token,"eval");
        if(decoded){
            req.body.userID = decoded.userID
            req.body.role = decoded.role
            next()
        }
    } else {
        res.status(400).send("Wrong Credential")
    }
}

module.exports={authentication}