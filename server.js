const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+'/dist/BringaBolt/',{dotFiles: 'allow'}));
app.use('/api/products',productsRouter);

app.get('*', function (req, res){
    res.sendFile(__dirname+'/dist/BringaBolt/index.html');
});

app.listen(port,()=>{
	console.log(`A szerver fut a ${port} porton.`);
});