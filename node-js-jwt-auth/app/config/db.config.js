module.exports={
    HOST:"localhost",
    USER:"root",
    PASSWORD:"sifre",
    DB:"node-login",
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};
