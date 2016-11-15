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

  register: function (req, res, next){
    var bodyUser = {
      username  : req.body.username,
      password  : req.body.password
    }

    var user = User.findOne({
      where: bodyUser
    }).then(function(result){
      if (!result) {
        User.create(bodyUser).then(function(user){
          ///test the connection with the data base
          sequelizeConfig.authenticate().then(function () {

              // create a token
              var token = jwt.sign(bodyUser, 'superSecret', {
                expiresIn: 1800 // expires in 30 min.
              });

              User.findOne({
                where: {
                  username: bodyUser.username,
                  password: bodyUser.password
                }

              }).then(function(result){

                var obj = '{'
                +'"id":"' + result.id + '",'
                +'"username":"' + result.username + '",'
                +'"token":"' + token + '"'
                +'}';

                res.send(JSON.parse(obj));

              }).catch(function (err) {

                var obj = '{"error": {"message":"'+ err.message +'", "code":"400" }}';
                res.send(JSON.parse(obj));

              });

            }).catch(function (err) {

              var obj = '{"error": {"message":"'+ err.message +'"}}';
              res.send(JSON.parse(obj));

            }).done();
          });
      }
      else {
        var obj = '{"error": {"message":"User already exists", "code":"400" }}';
        res.status(400);
        res.send(JSON.parse(obj));
      }
    });

  },

  postLogin: function(req, res, next){

    var bodyUser = {

     username 	: req.body.username,
     password	: req.body.password
   }


		///test te connection with the data base
		sequelizeConfig.authenticate() .then(function () {

        	// create a token
         var token = jwt.sign(bodyUser, 'superSecret', {
	          expiresIn: 1800 // expires in 30 min.
         });

         User.findOne({
          where: {
           username: bodyUser.username,
           password: bodyUser.password
         }

       }).then(function(result){

        var obj = '{'
        +'"id":"' + result.id + '",'
        +'"username":"' + result.username + '",'
        +'"token":"' + token + '"'
        +'}';

        res.send(JSON.parse(obj));

      }).catch(function (err) {
       var obj = '{"error": {"message":"Invalid Credentials", "code":"400" }}';
       res.status(400);
       res.send(JSON.parse(obj));
     });

    }).catch(function (err) {
      var obj = '{"error": {"message":"'+ err.message +'"}}';
      res.status(500);
      res.send(JSON.parse(obj));
    }).done();
  }
}