const express = require('express');
const router = express.Router();

var products = [
	{
		id:1,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Litening C68",
		slug:"cube-litening-c68-x-slt-carbonprizm",
		price:"2.719.990 Ft",
		image: "assets/images/cube-litening-c68-x-slt-carbonprizm-black.jpg",
		availableModels : {
			"grey" : {
				50 : 1,
				54 : 0,
				56 : 2
			},
			"green" : {
				48 : 1
			},
			"red" : {
				52 : 0
			}
		}
	},
	{
		id:2,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Agree C:62",
		slug:"cube-agree-c62",
		price:"969.990 Ft",
		image: "assets/images/cube-agree-c62.jpg",
		availableModels : {
			"dodgerblue" : {
				50 : 0,
				52 : 2,
				56 : 0
			}
		}
	},
	{
		id:3,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Attain SL",
		slug:"cube-attain-sl",
		price:"519.990 Ft",
		image: "assets/images/cube-attain-sl.jpg",
		availableModels : {
			"red" : {
				52 : 0,
				54 : 0,
				56 : 0
			}
		}
	},
	{
		id:4,
		categories: ["bikes","mtb"],
		brand:"Merida",
		name:"Merida Big Nine 20 29\"",
		slug:"merida-big-nine-20-29",
		price:"229.900 Ft",
		image: "assets/images/big-nine-20-antracit-silver.jpg",
		availableModels : {
			"grey" : {
				16 : 1,
				18 : 2
			}
		}
	}
];

router.get('/',(req,res)=>{
	res.json(products);
});

router.get('/getProductBySlug/:slug',(req,res)=>{
	res.json(products.find(product=>product.slug==req.params.slug));
})

router.get('/getProductsByCategory',(req,res)=>{
	res.json(products.filter(product=>product.categories.includes(req.query.category) 
		&& (!req.query.subcategory || product.categories.includes(req.query.subcategory))));
});

router.get('/getProductById/:id',(req,res)=>{
	res.json(products.find(product=>product.id==req.params.id));
});

/*router.get('/getProductByCategory/:category',(req,res)=>{
	res.json(products.find(product=>product.category==req.params.category));
});*/

module.exports = router;