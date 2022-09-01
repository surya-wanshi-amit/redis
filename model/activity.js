const sequelize = require("sequelize")

const database = require("../database.js")

const activity = database.define("activity",{
    task:{
        type:sequelize.STRING,
        allowNull:false
   }})

activity.sync();

module.exports = activity;