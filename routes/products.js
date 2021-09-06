const express = require('express');
const router = express.Router();

var products = {
	bikes : [
		{
			id:1,
			brand:"Cube",
			name:"Cube Litening C68",
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
			brand:"Cube",
			name:"Cube Agree C:62",
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
			brand:"Cube",
			name:"Cube Attain SL",
			price:"519.990 Ft",
			image: "assets/images/cube-attain-sl.jpg",
			availableModels : {
				"red" : {
					52 : 0,
					54 : 0,
					56 : 0
				}
			}
		}/*,
		{
			id:4,
			brand:"Merida",
			frame:"SCULTURA lite disc",
			crankset:"Shimano 105 50-34 ATC",
			frontDerailleur:"Shimano 105",
			rearDerailleur:"Shimano 105 GS",
			tyres:"Maxxis Dolomites 700x25C fold"
		}*/
	]
}

router.get('/',(req,res)=>{
	res.json(products);
})

router.get('/:id',(req,res)=>{
	console.log(req.params.id);
	res.json(products.bikes.find(product=>product.id==req.params.id));
})

module.exports = router;