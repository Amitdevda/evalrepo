const express = require("express")
const { connect } = require("./config/db")
const { authentication } = require("./middleware/authen")
const { prod } = require("./route/prod")
const { user } = require("./route/user")

const app= express()

app.use(express.json())
app.use("/",user)
app.use(authentication)
app.use("/",prod)

app.listen(process.env.port,async ()=>{
    try {
        await connect
        console.log("DB connected !!!")
        console.log("server is running!!!")
    } catch (error) {
        console.log(error)

    }
})
