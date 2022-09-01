const Sequelize = require('sequelize');
const dontenv = require("dotenv")
dontenv.config();
const sequelize=new Sequelize(process.env.DBNAME,process.env.DBUSERNAME,process.env.DBPASS,{
    host:'localhost',
    dialect:'postgres',
},
)
sequelize.authenticate()
module.exports=sequelize;

