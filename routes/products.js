const express = require('express');
const router = express.Router();
const fs = require('fs');
/*FRAME
Litening C:68X Monocoque Advanced Twin Mold Technology, Aero Headtube, Full Internal Cable Routing, Flat Mount Disc
SIZE
50, 52, 54, 56, 58, 60
FORK
Litening C:68X Aero, Integrated Cable Routing, Flat Mount Disc
BRAKE SYSTEM
Sram Red eTap AXS™ (160/160)
REAR DERAILLEUR
Sram Red eTap AXS™, 12-Speed
FRONT DERAILLEUR
Sram Red eTap AXS™
SHIFT/ BRAKE LEVERS
Sram Red eTap AXS™
CRANKSET
Sram Red Carbon, 48x35T
CASSETTE
Sram Red XG-1290, 10-33T
CHAIN
Sram Red D1
WHEELSET
Mavic Cosmic SLR 45 Carbon
TYRES
Schwalbe Pro One, Tubeless Easy, 28-622
INTEGRATED BAR/ STEM
ICR Aero Cockpit System, Integrated Cable Routing, Aero Spacer System, Garmin/Wahoo Mount Interface (50cm, 52cm: 400mm/90mm; 54cm, 56cm: 420mm/100mm; 58cm: 440mm/110mm; 60cm: 440mm/120mm)
HANDLEBAR TAPE
ACID Bartape RD
SEAT POST
Litening C:68X Aero, Comfort Flex
SEATCLAMP
CUBE Full Integrated Aero Clamp
SADDLE
Natural Fit Nuance SLT Road Carbon
HEADSET
ACROS, Top Integrated 1 1/8", Bottom Integrated 1 1/4"
WEIGHT
7,6 kg
COLOUR
liquidblue´n´carbon
ART. NO
579300
PRICE
2769990 HUF*/
var products = [
	{
		id:1,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Litening C68",
		slug:"cube-litening-c68-x-slt-carbonprizm",
		price:2719990,
		images: {
			"default" : {
				"grey" : ["cube-litening-c68-x-slt-carbonprizm-black.jpg"]
			}
		},
		availableColors : ["grey"],
		availableSizes : ["48","50","52","54","56"],
		productsInStock : {
			"grey" : {
				"50" : 1,
				"56" : 2
			}
		}
	},
	{
		id:2,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Agree C:62",
		slug:"cube-agree-c62",
		price:969990,
		images: {
			"default" : {
				"blue" : ["cube-agree-c62.jpg"]
			}
		},
		availableColors : ["blue"],
		availableSizes : ["48","50","52","54","56"],
		productsInStock : {
			"blue" : {
				"52" : 2
			}
		}
	},
	{
		id:3,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Attain SL",
		slug:"cube-attain-sl",
		images: {
			"default" : {
				"red" : ["cube-attain-sl.jpg"]
			}
		},
		price:519990,
		availableColors : ["red"],
		availableSizes : ["48","50","52","54","56"]
	},
	{
		id:4,
		categories: ["bikes","mtb"],
		brand:"Merida",
		name:"Merida Big Nine 20 29\"",
		slug:"merida-big-nine-20-29",
		price:229900,
		images: {
			"default" : {
				"grey" : ["big-nine-20-antracit-silver.jpg"]
			}
		},
		availableColors : ["grey"],
		availableSizes : ["16","18"],
		productsInStock : {
			"grey" : {
				"16" : 1,
				"18" : 2
			}
		}
	},
	{
		id:5,
		categories: ["accessories","lights"],
		brand: "Moon",
		name: "Moon Orion",
		slug: "moon-orion-rear-lights",
		price: 3690,
		images: {
			"default" : {
				"red" : ["moon-orion-rear.jpg"]
			}
		},
		availableColors: ["red"],
		availableSizes : ["One size"],
		productsInStock : {
			"red" : {
				"One size" : 3
			}
		}
	},
	{
		id:6,
		categories: ["parts","tires"],
		brand: "Continental",
		name: "Continental Grand Sport Race",
		slug: "continental-grand-sport-race",
		price: 14930,
		images: {
			"default" : {
				"black" : ["continental-grand-sport-race.jpg"]
			}
		},
		availableColors: ["black"],
		availableSizes : ["700x25c","700x28c"],
		productsInStock : {
			"black" : {
				"700x28c" : 11
			}
		}
	},
	{
		id:7,
		categories: ["bikes","mtb"],
		brand: "Merida",
		name: "Merida Big.Nine XT 2021",
		slug: "merida-big-nine-xt-2021",
		price: 939000,
		images: {
			"default" : {
				"black" : ["merida-big-nine-xt-matt-black-white.jpg"],
				"red" : ["merida-big-nine-xt-black-red.jpg"]
			}
		},
		availableColors: ["black","red"],
		availableSizes : ["19"],
		productsInStock : {
			"black" : {
				"19" : 1
			},
			"red" : {
				"19" : 2
			}
		}
	},
	{
		id:8,
		categories: ["accessories","pumps"],
		brand: "Giyo",
		name: "Giyo Pocket MP",
		slug: "giyo-pocket-mp",
		price: 2690,
		images: {
			"default" : {
				"black" : ["giyo-pocket-mp.jpg"]
			}
		},
		availableColors: ["black"],
		availableSizes : ["One size"],
		productsInStock : {
			"black" : {
				"One size" : 20
			}
		}
	},
	{
		id:9,
		categories: ["clothing","helmets"],
		brand: "Scott",
		name: "Scott ARX Plus",
		slug: "scott-arx-plus",
		price: 30590,
		images: {
			"default" : {
				"black" : ["scott-arx-plus.jpg"]
			}
		},
		availableColors: ["black"],
		availableSizes : ["51-55","55-59","59-61"],
		productsInStock : {
			"black" : {
				"55-59" : 4,
				"59-61" : 10
			}
		}
	},
	{
		id:10,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Litening C:68X SL",
		slug:"cube-litening-c68x-sl-liquidbluencarbon",
		price:2769990,
		images: {
			"default" : {
				"blue" : [
					"579300_light_zoom.jpg",
					"csm_579300_D1_ebf56a6950.jpg",
					"csm_579300_D2_c79dc18e7e.jpg",
					"csm_579300_D3_800ed16d01.jpg",
					"csm_579300_D4_564da5d302.jpg",
					"csm_579300_D5_a2302803df.jpg"
				]
			},
			"360degree" : {
				"blue" : [
					"cube-litening-c68x-sl-liquidbluencarbon-1.png",
					"cube-litening-c68x-sl-liquidbluencarbon-2.png",
					"cube-litening-c68x-sl-liquidbluencarbon-3.png",
					"cube-litening-c68x-sl-liquidbluencarbon-4.png",
					"cube-litening-c68x-sl-liquidbluencarbon-5.png",
					"cube-litening-c68x-sl-liquidbluencarbon-6.png",
					"cube-litening-c68x-sl-liquidbluencarbon-7.png",
					"cube-litening-c68x-sl-liquidbluencarbon-8.png",
					"cube-litening-c68x-sl-liquidbluencarbon-9.png",
					"cube-litening-c68x-sl-liquidbluencarbon-10.png",
					"cube-litening-c68x-sl-liquidbluencarbon-11.png",
					"cube-litening-c68x-sl-liquidbluencarbon-12.png",
					"cube-litening-c68x-sl-liquidbluencarbon-13.png",
					"cube-litening-c68x-sl-liquidbluencarbon-14.png",
					"cube-litening-c68x-sl-liquidbluencarbon-15.png",
					"cube-litening-c68x-sl-liquidbluencarbon-16.png",
					"cube-litening-c68x-sl-liquidbluencarbon-17.png",
					"cube-litening-c68x-sl-liquidbluencarbon-18.png",
					"cube-litening-c68x-sl-liquidbluencarbon-19.png",
					"cube-litening-c68x-sl-liquidbluencarbon-20.png"
				]
			}
		},
		//images360degree: true,
		availableColors : ["blue"],
		availableSizes : ["48","50","52","54","56"],
		productsInStock : {
			"blue" : {
				"50" : 1,
				"56" : 2
			}
		}
	},
	{
		id:11,
		categories: ["parts","chains"],
		brand: "KMC",
		name: "KMC X9, patentszemmel",
		slug: "kmc-x9",
		price: 5690,
		images: {
			"default" : {
				"gold" : ["chain-kmc-x9-gold-114-links-w-missinglink.jpg"],
				"grey" : ["chain-kmc-x9-silver-grey-114-links-w-missinglink.jpg"]
			}
		},
		availableColors: ["gold","grey"],
		availableSizes : ["114 szemes"],
		productsInStock : {
			"gold" : {
				"114 szemes":7
			},
			"grey" : {
				"114 szemes":7
			}
		}
	},
	{
		id:12,
		categories: ["clothing","helmets"],
		brand: "Specialized",
		name: "Specialized S-Works Evade II ANGi MIPS",
		slug: "specialized-s-works-evade-ii-angi-mips-road-helmet",
		price: 115320,
		images: {
			"default" : {
				"white" : ["specialized-s-works-evade-ii-angi-mips-road-helmet-white.jpg"],
				"red" : ["specialized-s-works-evade-ii-angi-mips-road-helmet-red.jpg"]
			},
			"360degree" : {
				"white" : [
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-0.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-1.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-2.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-3.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-4.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-5.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-6.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-7.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-8.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-9.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-10.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-11.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-12.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-13.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-14.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-15.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-16.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-17.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-18.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-19.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-20.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-21.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-22.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-23.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-24.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-25.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-26.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-27.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-28.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-29.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-30.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-31.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-32.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-33.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-34.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-35.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-36.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-37.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-38.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-39.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-40.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-41.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-42.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-43.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-44.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-45.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-46.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-47.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-48.jpg",
					"specialized-s-works-evade-ii-angi-mips-road-helmet-white-49.jpg"
				]
			}
		},
		availableColors: ["white","red"],
		availableSizes : ["S","M"],
		productsInStock : {
			"white" : {
				"S":0,
				"M":3
			},
			"red" : {
				"S":2,
				"M":1
			}
		}
	},
	{
		id:13,
		categories: ["clothing","helmets"],
		brand: "Specialized",
		name: "Specialized S-Works Prevail II Vent ANGi MIPS Bora-Hansgrohe Team Helmet",
		slug: "specialized-s-works-prevail-ii-vent-angi-mips",
		price: 115320,
		images: {
			"default" : {
				"green" : ["specialized-s-works-prevail-ii-vent-angi-mips-bora-hansgrohe-team-helmet-green.jpg"]
			}
		},
		availableColors: ["green"],
		availableSizes : ["S","M"],
		productsInStock : {
			"green" : {
				"S":1,
				"M":0
			}
		}
	},

	{
		id:14,
		categories: ["parts","chains"],
		brand: "KMC",
		name: "KMC X8, patentszemmel",
		slug: "kmc-x8",
		price: 4831,
		images: {
			"default" : {
				"gold" : ["x8-Gold.jpg","X8_0000_X8 Ti-N Gold.jpg",],
				"grey" : ["X8_0001_X8(NPNP).jpg"]
			}
		},
		availableColors: ["gold","grey"],
		availableSizes : ["114 szemes"],
		productsInStock : {
			"gold" : {
				"114 szemes":3
			},
			"grey" : {
				"114 szemes":10
			}
		}
	},
];

router.get('/',(req,res)=>{
	res.json(products);
});

router.get('/getProductsByName/:name',(req,res)=>{
	let filteredProducts = products.filter(product=>product.name.toLowerCase().indexOf(req.params.name.toLowerCase())>=0);
	if (filteredProducts.length>0){
		res.json(filteredProducts);
	} else {
		res.sendStatus(404);
	}
})

router.get('/getProductBySlug/:slug',(req,res)=>{
	const product = products.find(product=>product.slug==req.params.slug);
	if (product) {
		res.json(product);
	} else {
		res.sendStatus(404);
	}
});

router.get('/getProductImages/:id/:type/:color',(req,res)=>{
	fs.readdir(`./src/assets/images/products/${req.params.id}/${req.params.type}/${req.params.color}`,(err,files)=>{
		if (files) {
			sortedFiles=files.sort((a,b)=> a.localeCompare(b, "en", {numeric: true, ignorePunctuation: true}));
			//sortedFiles = sortedFiles.map(el=>`${req.params.id}/360degree/${el}`);
			res.json(sortedFiles);
		} else {
			res.sendStatus(404);
		}
	})
});

router.get('/getProduct360degreeImagesCount/:slug',(req,res)=>{
	fs.readdir(`./src/assets/images/products/${req.params.id}/360degree`,(err,files)=>{
		if (files) {
			sortedFiles=files.sort((a,b)=> a.localeCompare(b, "en", {numeric: true, ignorePunctuation: true}));
			sortedFiles = sortedFiles.map(el=>`${req.params.id}/360degree/${el}`);
			res.json(sortedFiles);
		} else {
			res.sendStatus(404);
		}
	})
});

router.get('/getProductsByCategory',(req,res)=>{
	if (req.query.category) {
		res.json(products.filter(product=>product.categories.includes(req.query.category) 
			&& (!req.query.subcategory || product.categories.includes(req.query.subcategory))));
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;