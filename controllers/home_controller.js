const passport = require("passport");
const User = require("../models/user");

module.exports.home=function(req,res){
    req.flash('success','Wecome!');
    return res.render('home',{
        title:'WeChat'
    });
}
module.exports.logIn=function(req,res){
    req.flash('success','Logged In Sucessfully!');
    return res.render('chat_engine',{
        title:'WeChat'
    });
}
module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:'WeChat'
    });
}
// get the sign up data
module.exports.createUser=function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Passwords Not Matched!');
        return res.redirect('back');
    }
    User.findOne({
        email:req.body.email
    },function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
             if(err){
                 console.log('error in creating user while signing up');
                 return;
             }
             req.flash('success','User Created Successfully!');
             return res.redirect('/');
            });
        }
        else{
            req.flash('error','User Already Exists!');
           return res.redirect('back');
        }
    });
}

module.exports.signOut=function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}