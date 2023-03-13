const express=require("express")
const { authentication } = require("../middleware/authen.js")
const {authorization} =require("../middleware/autho.js")
const { proModel } = require("../model/prod.js")

const prod= express.Router()

prod.get("/products",async (req,res)=>{
    try {
        const data= proModel.find()
            res.status(200).send(data)
        
    } catch (error) {
        res.status(400).send(error)
    }   
})

prod.post("/addproducts", authorization(["seller"]),async (req, res) => {
    const prodata = req.body
    try {
        const data = new proModel(prodata)
        await data.save();
        res.status(200).send("product added !!!!")
    } catch (error) {
        res.status(401).send("Error in adding!!!!")
    }
})

prod.delete("/deleteproducts/:id", authorization(["seller"]), async (req, res) => {
    const par = req.params.id;
    try {
        await userModel.findByIdAndDelete({ "_id": par})
        res.status(200).send("product Deleted !!!!")
    } catch (error) {
        res.status(401).send("Error in delete !!!!")
    }
})

module.exports={prod}