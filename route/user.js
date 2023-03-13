const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs=require("fs")

const { regModel } = require("../model/register.js")

const user= express.Router()

user.post("/signup", (req, res) => {
    const { name, email, mobile_num, role, password } = req.body;
    try {
        bcrypt.hash(password, 3, async function (err, hash) {
            if (err) {
                res.status(401).send({
                    "msg": "err",err
                })
            }
            const data = new regModel({ name, email, mobile_num, role, password: hash })
            await data.save()
            res.status(200).send({
                "msg": "Signup Done!!!"
            })
        });
    } catch (error) {
        res.status(401).send({
            "msg": "error"
        })
    }
})

user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await regModel.find({ email })
        if (userData.length > 0) {
            bcrypt.compare(password, userData[0].password, function (err, data) {
                if (err) {
                    res.status(401).send({ "msg": err })
                }
                if (data) {
                    const token = jwt.sign({ "role": userData[0].role }, "eval", { expiresIn: 60});
                    const reftoken = jwt.sign({ "role": userData[0].role }, "evalharhai", { expiresIn: 300 });
                    res.status(200).send({
                        "msg": "Login !!!!",
                        token, reftoken
                    })
                }

            })
        }else{
            res.status(400).send("Wrong Credential")
        }
        
    } catch (error) {
        res.status(400).send("Wrong Credential"+"-"+error)

    }
})

user.get("/logout",(req,res)=>{
    const token= req.headers.authorization;
    try {
        if(token){
           const data = JSON.parse(fs.readFileSync("./blacklisted.json","utf-8"))
           data.push(token)
           fs.writeFileSync("./blacklisted.json", JSON.stringify(data))
           res.status(200).send("Logout Hogya !!!!!")
        }else{
            res.status(400).send("plzz login !!!")
        }
    } catch (error) {
        res.status(400).send("logout error")
    }
})

module.exports={user}