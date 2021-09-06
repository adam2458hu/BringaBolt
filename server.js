const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products',productsRoutes);

app.listen(port,()=>{
	console.log(`A szerver fut a ${port} porton.`);
});