require('dotenv').config();
const visionML = require('@google-cloud/vision');
const client = new visionML.ImageAnnotatorClient({
    keyFilename: process.env.SECRET_PATH
});
const constants = require('../../../constants');
const path = require('path');
const buildDominantPallette = (colorArray)=>{
    //while PalleteSize < 5
    let dominantPallette = [];
    for(let i = 0; i < constants.PALLETTE_SIZE; i++){
        dominantPallette.push(getAndRemoveMostDominantColor(colorArray));
    }
    return dominantPallette;
};

const getAndRemoveMostDominantColor = (colorArray)=>{
    let max  = 0;
    let maxIndex = 0;
    for(let i = 0; i < colorArray.length; i++){
        if(colorArray[i].pixelFraction > max){
            max = colorArray[i].pixelFraction;
            maxIndex = i;
        }
    }
    let maxColorObj = colorArray.splice(maxIndex,1)[0];
    let maxColor = maxColorObj.color;
    return maxColor;
};
exports.getPallette = (req,res,next) =>{
    return client.imageProperties({
            content: req.body.buffer
        })
        .then((response) => {
            const colors = response[0].imagePropertiesAnnotation.dominantColors.colors;

            let colorpalette = buildDominantPallette(colors);
            console.log(colorpalette);
            res.status(200).send(colorpalette);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
}

exports.test = (req,res,next) =>{
    return client.imageProperties(`${constants.serverAssetPath}/test2.png`)
        .then((response) => {
            const colors = response[0].imagePropertiesAnnotation.dominantColors.colors;
            //console.log(colors);
            let colorpalette = buildDominantPallette(colors);
           // console.log(colorpalette);
            res.status(200).send(colorpalette);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
}
