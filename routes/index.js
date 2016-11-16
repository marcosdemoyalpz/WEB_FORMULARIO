var express = require('express');
var router = express.Router();


var usermodel = require('../model/user');
var getUsersodel = require('../model/getUsers');
// var restaurantModel = require('../model/restaurant');
// var restByTypeModel = require('../model/restByType');


router.post('/login', usermodel.postLogin);
router.post('/register', usermodel.register);
router.get('/getAllUsers', getUsersodel.getUsers);

// router.get('/restByType/:id/:page/:perPage', restByTypeModel.getRestaurantDetail);
// router.get('/restaurant/:page/:perPage', restaurantModel.getRestaurant);
// router.get('/restaurantDetail/:id', restaurantModel.getRestaurantDetail);

module.exports = router;

