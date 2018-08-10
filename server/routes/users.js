const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Book } = require('../models/book');
const { auth } = require('../middlewares/auth');

// #region GET
router.get('/auth', auth, (req, res) => {
    //localhost:3001/api/user/auth
    const { _id, email, name, lastname} = req.user;
    res.json({
        isAuth: true,
        id: _id,
        email: email,
        name: name,
        lastname: lastname
    });
});

router.get('/reviewer', (req, res) => {
    //localhost:3001/api/user/reviewer?id=5b670ff5ad9e852fecac36f4
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err); 
        if(!doc) return res.json({success: false, message: 'User not found'})
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    });
});

router.get('/all', (req, res) => {
    //localhost:3001/api/user/all    
    User.find({}, (err, users) => {
        if(err) return res.status(400).send(err); 
        
        res.status(200).json(users)
    });
});

router.get('/posts', (req, res) => {
    //localhost:3001/api/user/posts    
    Book.find({ownerId: req.query.user}, (err, docs) => {
        if(err) return res.status(400).send(err); 
        
        res.status(200).json(docs)
    });
});

router.get('/logout', auth, (req, res) => {
    //localhost:3001/api/user/logout   
    const { user, token } = req;
    user.deleteToken(token, (err, user) => {
        if(err) return res.status(400).send(err); 
        res.sendStatus(200);
    });     
});

// #endregion
// #region POST

router.post('/register', (req, res) => { 
    //localhost:3001/api/user/register    
    const user = new User(req.body);    
    user.save((err, doc) => {   
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: doc
        })
    });    
});

router.post('/login', (req, res) => { 
    //localhost:3001/api/user/login 
    const { email, password } = req.body;    
    User.findOne({'email': email}, (err, user) => {
        if(err) return res.status(400).send(err); 
        if(!user) return res.json({
            isAuth:false, 
            message: 'Auth failed, email not found.'
        });

        user.comparePassword(password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                isAuth:false, 
                message: 'Wrong password'            
            }); 

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);              

                res.cookie('auth', user.token).send({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                });
            });
         });
    });
});

// #endregion

module.exports = router;