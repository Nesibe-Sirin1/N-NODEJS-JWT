const express =require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const { role } = require("./app/models");
const db = require("./app/models");
const app=express();

var corsOptions={
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());                            //parse request of content-type -application/json
app.use(bodyParser.urlencoded({extended:true}));       //parse requests of content-type -application/x-www-urlencoded
app.get("/", (req,res) =>{                             //simple route
    res.json({message:"welcome to  nesibe application"});
});

const PORT= process.env.PORT || 8080;                  //set port,listen for requests
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});

//const db=require("./app/models");
const Role=db.role;

db.sequelize.sync({force:true})
    .then(() =>{
        console.log('drop and Resync Db');
        initial();
    });

function initial()
{
    Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"moderator"
    });
    
}
