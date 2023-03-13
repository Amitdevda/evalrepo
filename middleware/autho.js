const authorization= (role)=>{
    return (req,res,next)=>{
        const userrole=req.body.role

        if(role.incluses(userrole)){
            next()
        }else{
            res.status(400).send("Unauthorised !!!!!")
        }
    }
}

module.exports={authorization}