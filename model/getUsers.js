var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
var sequelizeConfig = require('.././database/config');

var User = sequelizeConfig.define('users', {

  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },

  typeID: {
    type: Sequelize.INTEGER,
    field: 'typeID',
    references: {
      model: "usertypes",
      key: "typeID"
    }
  },

  username: {
    type: Sequelize.STRING,
    field: 'username'
  },

  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  
  active: {
    type: Sequelize.BOOLEAN,
    field: 'active'
  }


}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = {

	getUsers: function(req, res, next){

		///test the connection with the data base
		sequelizeConfig.authenticate() .then(function () {

      User.findAll().then(function(result){
        res.send(JSON.parse(JSON.stringify(result)));

      }).catch(function (err) {
        
       var obj = '{"error": {"message":"'+ err.message +'", "code":"400" }}';
       res.send(JSON.parse(obj));
     });

    }).catch(function (err) {
      
      var obj = '{"error": {"message":"'+ err.message +'"}}';
      res.send(JSON.parse(obj));
      
    }).done();
  }
}