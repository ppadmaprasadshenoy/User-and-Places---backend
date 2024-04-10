const express = require('express');
const {check} = require('express-validator');

const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

// The above routes can be accessed by anyone. But below ones are now authorized(Can only be reached through token) - because of checkAuth! 
router.use(checkAuth);

router.post('/', 
            fileUpload.single('image'),
            [ 
                check('title')
                    .not()
                    .isEmpty(), 
                check('description')
                    .isLength({min: 5}),
                check('address')
                    .not()
                    .isEmpty()
            ],
            placesControllers.createPlace);

router.patch('/:pid',
             [
                check('title')
                    .not()
                    .isEmpty(), 
                check('description')
                    .isLength({min: 5}),
             ],
             placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;