const express = require('express');
const cors = require('cors');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/', cors(), (req: any, res: any) => {
    return res.json({ message: 'HOLA gerd!' });
});

app.listen(PORT, HOST, () => console.log('running!'));