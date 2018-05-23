require('dotenv').config();
const app = require('express')();
const visionML = require('@google-cloud/vision');

const client = new visionML.ImageAnnotatorClient({keyFilename:process.env.SECRET_PATH});

const PALLETTE_SIZE = 5;

app.post('/',(req,res,next)=>{
    return client.imageProperties({content:req.body.buffer})
    .then((response)=>{
        const colors = response[0].imagePropertiesAnnotation.dominantColors.colors;

        let colorpalette = [];
        if (colors.length > PALLETTE_SIZE) {
            for (let i = 0; i < PALLETTE_SIZE; i++) {
                colorpalette.push(colors[i].color);
            }
        } else {
            colorpalette = colors.map((el) => {
                return el.color
            });
        }
        console.log(colorpalette);
        res.status(200).send(colorpalette);

    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    })
});

app.get('/test',(req,res,next)=>{
    return client.imageProperties(`${__dirname}/assets/test.jpg`)
    .then((response)=>{
        const colors = response[0].imagePropertiesAnnotation.dominantColors.colors;

        let colorpalette = [];
        if(colors.length > 5){
            for(let i = 0; i < 5;i++){
                colorpalette.push(colors[i].color);
            }
        }else{
            colorpalette = colors.map((el)=>{
                return el.color
            });
        }
        console.log(colorpalette);
        res.status(200).send(colorpalette);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    });
})

app.listen(3000);