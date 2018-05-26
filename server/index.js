require('dotenv').config();
const express = require('express');
const app = require('express')();
const mlRouter = require('./routes/mlCloud');
const constants = require('../constants');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use(fileUpload());
app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.raw({
    type: 'application/octet-stream',
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static(`${constants.clientPublicPath}`))
app.get('/',(req,res)=>{
    res.sendFile(constants.indexPath);
})
app.use('/ML',mlRouter);
const port = process.env.PORT || 3000;
app.listen( port,()=>{
    console.log(`App Listening on port ${port}`);
});