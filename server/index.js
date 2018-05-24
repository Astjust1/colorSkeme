require('dotenv').config();
const app = require('express')();
const mlRouter = require('./routes/mlCloud');

app.use('/ML',mlRouter);
app.listen(3000,()=>{
    console.log('App Listening on port 3000');
});