const ShopDB = require('./shopDB.js')
const Bike = ShopDB.getBikeModel();

(async() => {

	await Bike.deleteMany({});

	let bike1 = new Bike({
		name: "Mountain Bike",
        description: "A sturdy bike built for rough terrain.",
        price: 5999.00,
        stockQuantity: 10,
        image: "./images/transition.jpg" 
	}); 

	let bike2 = new Bike({
		name: "Road Bike",
        description: "Lightweight and aerodynamic, perfect for long rides on smooth roads.",
        price: 4500.00,
        stockQuantity: 5,
        image: "./images/bianchi.jpg" 
	}); 

	let bike3 = new Bike({
		name: "Gravel Bike",
        description: "Combines the best features of road and mountain bikes for versatile riding.",
        price: 5000.99,
        stockQuantity: 8,
        image: "./images/juliana.jpg"
	}); 
    
    let bike4 = new Bike({
		name: "City Cruiser",
        description: "Mountain bike meets city life.",
        price: 1899.99,
        stockQuantity: 3,
        image: "./images/ls.jpg"
	}); 

	let bike5 = new Bike({
		name: "Commuter Bike",
        description: "Reliable and tough, great for commuters or travelers.",
        price: 1600.99,
        stockQuantity: 6,
        image: "./images/commuter.jpg"
	});

	await Promise.all([
			bike1.save(), 
			bike2.save(), 
			bike3.save(),
            bike4.save(), 
			bike5.save()
		]);

	let currentBikes = await Bike.find({});

	console.log(currentBikes);

	process.exit();


})();