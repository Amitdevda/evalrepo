const mongoose= require("mongoose")

const Regschemma= mongoose.Schema({
    name: String,
    email: String,
    mobile_num: Number,
    role: {type: String, enum:["seller","customer","admin"], default:"customer"},
    password: String
},{
    versionKey: false
})

const regModel = mongoose.model("newuser",Regschemma)

module.exports={
    regModel
}