const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/globalkeys');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
//Validations
const validateRegisterInput = require('../validation/register.validation');
const validateLoginInput = require('../validation/login.validation');

//Models
const User = require('../models/user.model');



// @route GET /users
// @desc Get All User List
// @access Public
router.route('/').get((req,res)=>{

    User.find((err,data)=>{
        if(err){res.status(400).json({status:0,message:err})}
        res.status(200).json(data);
    });

});

// @route GET /users/:id
// @desc Get User by ID
// @access Public
router.route('/:id').get((req,res)=>{
    
    User.findById(req.params.id)
    .select('-auth')
    .then(data => {
        if(!data){
            return res.status(400).json({status:0,message:'Data tidak ditemukan'})
        }

        return res.status(200).json(data);
    })
    .catch(err=>{
        return res.status(400).json(err);
    })

    
    
    
    
});

// @route GET /users/:id
// @desc UPDATE USER by ID
// @access Public
router.route('/:id').patch((req, res) => {
    console.log(req.body)
    User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        (err, data) => {
            if (err) { res.status(400).json({ status: 0, message: 'Error' }) };
            const payload = {
                id: data._id,
                fullName: data.fullName,
                photoProfile: data.biodata.photo,

            };

            jwt.sign(
                payload,
                keys.JWTSecretKey,
                {
                    expiresIn: 86400 //1 hari
                },
                (err, token) => {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({ status: 1, message: 'Update Data berhasil', token: token })
                }
            );


        }
    )

});

// @route GET /users/:id
// @desc post User by ID
// @access Public
router.route('/currentUser/id/:id').post((req, res) => {
    if (!req.cookies.token || req.cookies.token !== req.body.jwtToken) {
        return res.status(400).json({ status: 0, message: 'Not Authorized' })
    }

    User.findById(req.params.id).then(data => {
        if (!data) {
            return res.status(400).json({ status: 0, message: 'Data tidak ditemukan' })
        }

        return res.status(200).json(data);
    })
        .catch(err => {
            return res.status(400).json(err);
        })






});


// @route POST /users/register
// @desc Login user
// @access Public
router.route('/login').post((req,res) => {
    const {errors,isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json({success:false,message: "Username atau password salah!"});
        }
        
        bcrypt.compare(password,user.auth.password).then(isMatch=>{
            if(isMatch){
                const payload = {
                    id : user.id,
                    fullName : user.fullName,
                    photoProfile: user.biodata.photo,
                };

                jwt.sign(
                    payload,
                    keys.JWTSecretKey,
                    {
                        expiresIn: 86400 //1 hari
                    },
                    (err,token)=>{
                        res.cookie('token',token,{httpOnly:true});

                        res.json({
                            success: true,
                            token: token
                        })
                    }
                );
            }else{
                return res.status(400).json({success:false,message: "Username atau password salah!"})
            }
        });
    });

});

router.route('/checkAvailableEmail').post((req,res) => {
    User.findOne({ email: req.body.regemail}).then(user => {
        if(user){
            return res.status(400).json({status:0,message: "Email sudah terdaftar!"});
        }else{
            return res.status(200).json({ status: 1, success: true })
        }

        
    });
});
router.route('/register').post((req,res) => {
    const {errors,isValid} = validateRegisterInput(req.body);
    

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ 'auth.username': req.body.username }).then(user => {

        if (user) {
            return res.status(400).json({ message: "Username sudah terdaftar" });
        }else {
            const newUser = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                auth : {
                    username: req.body.username,
                    password: req.body.password
                },
                verification:{},
                address:{},
                reputation:{},
                biodata:{},

            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.auth.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.auth.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });


            });
        }

    });
});






router.route('/deleteUser/:id').delete((req,res)=>{
    User.findByIdAndRemove(req.params.id,(err,data) => {
        if(err){res.status(400).json(err);throw err;}
        res.status(200).json({status:"OK", message:"Data "+data.fullName+" Berhasil dihapus"})
    });
});

router.route('/changePassword/').patch((req,res) => {
    const {currentPassword,password2} = req.body;
    const salt = bcrypt.genSaltSync(10);
    User.findById(req.body.id, (err,data)=>{
        if(err){res.status(400).json(err)}

        bcrypt.compare(currentPassword,data.auth.password).then(isMatch=>{
            if (isMatch) {
                const newPasswordHashed = bcrypt.hashSync(password2);
                User.findByIdAndUpdate(req.body.id,
                    { $set: { 'auth.password': newPasswordHashed } }, (err, data) => {
                        if (err) { res.status(400).json({ status: 0, message: err }) }
                        res.status(200).json({ status: 1, message: 'Password berhasil diperbaharui' })
                    }
                );
            } else {
                return res.status(400).json({ status: 0, message: 'Password lama salah!' });
            }
        });

    });
    
});


router.route('/currentAuthenticated').put((req,res) => {
    res.status(200).json({token: req.cookies.token})
});
module.exports = router;