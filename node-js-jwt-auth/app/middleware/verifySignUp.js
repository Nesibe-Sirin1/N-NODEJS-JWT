const db=require("../models");
const { return } = require("../models/user.model");
const db = require("../models/user.model");
const ROLES=db.ROLES;
const User=db.user;
checkDuplicateUserNameOrEmail=(req,res,next) =>{
    User.findOne({     //username
        where:{
            username:req.body.username
        }
    })
    .then(user =>{
        if(user){
            res.status(400).send({
                message:"Failed! Username is already in use!"
            });
            return;
        }
        User.findOne({    //Email
            where:{
                email:req.body.email
            }
        })
        .then(user =>{
            if(user){
                res.status(400).send({
                    message:"Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
};

checkRolesExisted=(req,res,next) ={
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"Failed! Role is already in use!"
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp={
    checkDuplicateUserNameOrEmail:checkDuplicateUserNameOrEmail,
    checkRolesExisted:checkRolesExisted
};
module.exports=verifySignUp;








