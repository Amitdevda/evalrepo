const mongoose= require("mongoose")

const Proschemma= mongoose.Schema({
    proname: String,
    batch_num: Number,
    price: Number,
    disc:String,
    quantity:Number
},{
    versionKey: false
})

const proModel = mongoose.model("newpro",Proschemma)

module.exports={
    proModel
}