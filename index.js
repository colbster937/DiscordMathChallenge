const express = require('express');
const { createCanvas, registerFont } = require('canvas');
const path = require('path');

const app = express();
const port = 3005;

registerFont(path.join(__dirname, 'impact.ttf'), { family: 'Impact' });

async function generateMathChallenge() {
    const width = 450;
    const height = 135;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '32px Impact';
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    ctx.strokeText('Math challenge (99% fail):', width / 2, 40);
    ctx.fillText('Math challenge (99% fail):', width / 2, 40);

    const numA = Math.floor(Math.random() * 5) + 2;
    const numB = Math.floor(Math.random() * 10) * numA;
    const numC = Math.floor(Math.random() * 21) + 3;

    ctx.font = '64px Impact';

    ctx.strokeText(`${numB}  /  ${numA}  +  ${numC}`, width / 2, height / 2 + 45);
    ctx.fillText(`${numB}  /  ${numA}  +  ${numC}`, width / 2, height / 2 + 45);


    return canvas.toBuffer('image/png');
}

app.get('/', async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Content-Type', 'image/png');

    try {
        const mathImage = await generateMathChallenge();
        res.send(mathImage);
    } catch (error) {
        res.status(500).send('Error generating problem');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
