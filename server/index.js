require('dotenv').config();
const express = require('express');
const app = require('express')();
const mlRouter = require('./routes/mlCloud');
const constants = require('../constants');
console.log(constants);
console
app.use('/public', express.static(`${constants.clientPublicPath}`))
app.get('/',(req,res)=>{
    res.sendFile(constants.indexPath);
})
app.use('/ML',mlRouter);
const port = process.env.PORT || 3000;
app.listen( port,()=>{
    console.log(`App Listening on port ${port}`);
});