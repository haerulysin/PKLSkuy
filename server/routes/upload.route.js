const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');

router.post('/files', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: 'No file' });
    }
    const file = req.files.file;
    file.mv('../client/public/assets/upload/' + req.body.fileName, err => {
        if (err) {
            return res.status(200).send(err);
        }
        res.json({ fileName: file.name, filePath: '../public' + file.name });
    })


});

router.delete('../client/public/assets/upload/:fileName',(req,res)=>{

    fs.unlink('public/'+req.params.fileName,(err)=>{
        if(err){res.status(400).json({status:0,message:err})}

        res.status(200).json({status:1,message:'File succesfully deleted'});
    })
})
module.exports = router;