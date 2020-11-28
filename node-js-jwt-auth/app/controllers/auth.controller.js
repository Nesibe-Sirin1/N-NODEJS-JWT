const db=require("../models");
const config=require("../config/auth.config");
const User=db.user;
const Rule=db.role;
const Op=db.Sequelize.Op;
var jwt=require("jsonwebtoken");
var bcrytp =require("bcryptjs");
const { role } = require("../models");

exports.signup=(req,res) =>{
    User.create({                // save user to database
        username:req.body.username,
        email:req.body.email,
        password:bcrytp.hashSync(req.body.password,8)
    })
    .then(user =>{
        if(req.body.roles){
            role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            })
            .then(roles =>{
                user.setRoles(roles)
                .then(() =>{
                    res.send({message:"User was registeres successfully!"});
                });
            });
        }
        else{
            user.setRoles([1])
            .then(() =>{
                res.send({  message :"User was registered successfully!"});
            });
        }
    })
    .catch(err =>{
        res.status(500).send({ message:err.message});
    });
};

exports.signin=(req,res) =>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(user =>{
        if(!user){
            return res.status(404).send({message:"User Not found"});
        }
        var passwordIsValid=bcrytp.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message:"Invalid Password!"
            });
        }
        var token=jwt.sign({ id: user.id} ,config.secret,{
            expiresIn:86400         //24 hours
        });
        var authorities=[];
        user.getRoles()
        .then(roles =>{
            for(let i=0; i<roles.length; i++){
                authorities.push("ROLE_"+ roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id:user.id,
                username:user.username,
                email:user.email,
                roles:authorities,
                accessToken:token
            });
        });
    })
    .catch(err =>{
        res.status(500).send({ message:err.message});
    });
    
};