const express=require('express');
const router=express.Router();
const passport=require('passport');

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

router.post('/login',passport.authenticate(
    'local',
    {
        failureFlash:'Invalid Username/Password',
        failureRedirect:'/'},
        ),
        homeController.logIn);
router.post('/sign-up',homeController.signUp);
router.post('/create-user',homeController.createUser);
router.get('/sign-up',homeController.signUp);
router.get('/sign-out',homeController.signOut);

module.exports=router;