const express = require('express');
const router = express.Router();
const fs = require('fs');

var products = [
	{
		id:1,
		categories: ["bikes","road"],
		brand:"Cube",
		name:"Cube Litening C68",
		slug:"cube-litening-c68-x-slt-carbonprizm",
		price:2719990,
		discountPercentage:12,
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
		discountPercentage:0,
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
		discountPercentage:0,
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
		discountPercentage:0,
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
		discountPercentage:0,
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
		price: 8230,
		discountPercentage:0,
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
		},
		features : {
			punctureProtection : "Van",
			tyreBeadType : "Drótperemes",
			weight: "270g"
		}
	},
	{
		id:7,
		categories: ["bikes","mtb"],
		brand: "Merida",
		name: "Merida Big.Nine XT 2021",
		slug: "merida-big-nine-xt-2021",
		price: 939000,
		discountPercentage:20,
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
		},
		features : {
			wheelSize : "29"
		}
	},
	{
		id:8,
		categories: ["accessories","pumps"],
		brand: "Giyo",
		name: "Giyo Pocket MP",
		slug: "giyo-pocket-mp",
		price: 2690,
		discountPercentage:0,
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
		discountPercentage:0,
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
		discountPercentage:0,
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
		availableColors : ["blue"],
		availableSizes : ["48","50","52","54","56"],
		productsInStock : {
			"blue" : {
				"50" : 1,
				"56" : 2
			}
		},		
		features : {
			frame : "Litening C:68X Monocoque Advanced Twin Mold Technology, Aero Headtube, Full Internal Cable Routing, Flat Mount Disc",
			fork : "Litening C:68X Aero, Integrated Cable Routing, Flat Mount Disc",
			rearDerailleur : "Sram Red eTap AXS™, 12-Speed",
			frontDerailleur : "Sram Red eTap AXS™",
			shiftAndBrakeLevers : "Sram Red eTap AXS™",
			crankset : "Sram Red Carbon, 48x35T",
			casette : "Sram Red XG-1290, 10-33T",
			chain : "Sram Red D1",
			wheelset : "Mavic Cosmic SLR 45 Carbon",
			wheelSize : "28",
			tyres : "Schwalbe Pro One, Tubeless Easy, 28-622",
			headset : "ACROS, Top Integrated 1 1/8\", Bottom Integrated 1 1\/4\"",
			saddle : "Natural Fit Nuance SLT Road Carbon",
			weight : "7,6 kg"
		},
		reviews : [
			{
				id : "1",
				userID : "user1",
				description: "Remek bringa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ullam asperiores debitis soluta suscipit nisi similique, beatae tempore, cupiditate, possimus dolorum quidem. Possimus labore nobis, tempore, sit facere omnis consectetur.",
				rating: 5,
				color: "blue",
				size: "56",
				upvotes : 1,
				downvotes : 0,
				createdAt: "2021-08-12"
			},
			{
				id : "2",
				userID : "user2",
				description: "Lemértem és 7.6 helyett 7.7 kiló, ezért csak 3 csillag.",
				rating: 3,
				color: "blue",
				size: "50",
				upvotes : 0,
				downvotes : 5,
				createdAt: "2021-10-25"
			},
			{
				id : "3",
				userID : "user3",
				description: "Eddig bevált. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ullam asperiores debitis soluta suscipit nisi similique, beatae tempore, cupiditate, possimus dolorum quidem. Possimus labore nobis, tempore, sit facere omnis consectetur.",
				rating: 5,
				color: "blue",
				size: "48",
				upvotes : 1,
				downvotes : 0,
				createdAt: "2021-03-05"
			}
		]
	},
	{
		id:11,
		categories: ["parts","chains"],
		brand: "KMC",
		name: "KMC X9, patentszemmel",
		slug: "kmc-x9",
		price: 5690,
		discountPercentage:0,
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
		discountPercentage:0,
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
		discountPercentage:5,
		images: {
			"default" : {
				"cyan" : ["specialized-s-works-prevail-ii-vent-angi-mips-bora-hansgrohe-team-helmet-green.jpg"]
			}
		},
		availableColors: ["cyan"],
		availableSizes : ["S","M"],
		productsInStock : {
			"cyan" : {
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
		discountPercentage:0,
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
	{
		id:15,
		categories: ["accessories","pumps"],
		brand: "Compass",
		name: "Compass Super Pump",
		slug: "compass-super-pump",
		price: 6290,
		discountPercentage:0,
		images: {
			"default" : {
				"orange" : [
					"compass-big-1.jpg",
					"compass-big-2.jpg",
					"compass-big-3.jpg",
					"compass-big-4.jpg"
				]
			}
		},
		availableColors: ["orange"],
		availableSizes : ["One size"],
		productsInStock : {
			"orange" : {
				"One size" : 12
			}
		}
	},
	{
		id:16,
		categories: ["accessories","lights"],
		brand: "Wheel Zone",
		name: "Wheel Zone LED lights",
		slug: "wheel-zone-led-lights",
		price: 490,
		discountPercentage:0,
		images: {
			"default" : {
				"red" : [
					"wheel_zone_lights_1.jpg",
					"wheel_zone_lights_2.jpg"
				],
				"white" : [
					"wheel_zone_lights_1.jpg",
					"wheel_zone_lights_2.jpg"
				]
			}
		},
		availableColors: ["red","white"],
		availableSizes : ["One size"],
		productsInStock : {
			"red" : {
				"One size" : 5
			},
			"white" : {
				"One size" : 5
			}
		}
	},
	{
		id:17,
		categories: ["parts","tires"],
		brand: "Schwalbe",
		name: "Schwalbe Space HS326 26X2,35 (60-559)",
		slug: "schwalbe-space-hs326",
		price: 7650,
		discountPercentage:0,
		images: {
			"default" : {
				"black" : ["schwalbe_space.jpg"]
			}
		},
		availableColors: ["black"],
		availableSizes : ["26X2,35"],
		productsInStock : {
			"black" : {
				"26X2,35" : 3
			}
		},
		features : {
			punctureProtection : "Van",
			tyreBeadType : "Drótperemes",
			weight: "1060g"
		}
	}
];

function parseQueryStringToObject(s){
	const constructedObject={};
	for(const [key,value] of new URLSearchParams(s).entries()) {
	   constructedObject[key]=value;
	}
    return constructedObject;
}

router.get('/',(req,res)=>{
	const { category,subcategory,name,slug,brands,price,sizes,wheelSizes,sort,limit,offset } = req.query;
	let filteredProducts = [...products];
	
	if (category) {
		filteredProducts = filteredProducts.filter(product=>product.categories.includes(category));
	}

	if (subcategory) {
		filteredProducts = filteredProducts.filter(product=>product.categories.includes(subcategory));
	}

	if (name) {
		filteredProducts = filteredProducts.filter(product=>product.name.toLowerCase().indexOf(name.toLowerCase())>=0);
	}

	if (slug) {
		filteredProducts = filteredProducts.find(product=>product.slug===slug);
	}

	if (brands) {
		filteredProducts = filteredProducts.filter(product=>brands.includes(product.brand));
	}

	if (wheelSizes) {
		filteredProducts = filteredProducts.filter(product=>product.features && product.features.wheelSize && wheelSizes.includes(product.features.wheelSize));
	}

	if (sizes) {
		filteredProducts = filteredProducts.filter(product=>product.availableSizes.some(availableSize=>sizes.includes(availableSize)));
	}

	if (price) {
		const priceObject = parseQueryStringToObject(price);
		filteredProducts = filteredProducts.filter(product=>
	      product.price>=priceObject.minPriceSetByUser && product.price<=priceObject.maxPriceSetByUser
	    );
	}

	res.json(filteredProducts);
});

module.exports = router;