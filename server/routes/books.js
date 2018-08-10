const express = require('express');
const router = express.Router();
const { Book } = require('../models/book');
// #region GET

router.get('/', (req, res) => {
    //localhost:3001/api/book?id=5b66ff6ca79429656cdce3e3
    let id = req.query.id;
    Book.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })    
})

router.get('/all', (req, res) => {   
    //localhost:3001/api/book/all?skip=3&limmit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order =req.query.order;

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
})

// #endregion
// #region POST

router.post('/', (req, res) => { 
    //localhost:3001/api/book       
    const book = new Book(req.body);    
    book.save((err, doc) => {   
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    });    
})

// #endregion
// #region UPDATE

router.post('/update', (req, res) => {  
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
})

// #endregion 
// #region DELETE

router.delete('/', (req, res) => {
    //localhost:3001/api/delete_book?id=5b66ff6ca79429656cdce3e3
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    })
})

// #endregion 

module.exports = router;