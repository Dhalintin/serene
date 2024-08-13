const fs = require('fs');

// Define the categories
const categories = [
    "Apple", "Banana", "Carrot", "Tomato", "Lemon", "Cherry", "Blueberry", "Grape", "Cabbage", "Potato",
    "Strawberry", "Watermelon", "Pepper", "Pumpkin", "Onion", "Chocolate", "Candy", "Lollipop", "Cupcake",
    "Cheesecake", "Cookie", "Muffin", "Donut", "Pizza", "Burger", "Hotdog", "Spaghetti", "Meatball", "Sausage",
    "Bacon", "Ketchup", "Mustard", "Mayo", "IceCream", "Popsicle", "Marshmallow", "Gumdrop", "Caramel",
    "GummyBear", "Jellybean", "Butterscotch", "Gingersnap", "Brown", "Red", "Blue", "Yellow", "Green", "Purple",
    "Orange", "Pink", "White", "Black"
];

// Generate combinations
const funnyNames = new Set();
while (funnyNames.size < 400) {
    const [first, second] = [categories[Math.floor(Math.random() * categories.length)], categories[Math.floor(Math.random() * categories.length)]];
    if(!funnyNames.has(`${first}_${second}`)){
        funnyNames.add(`${first}_${second}`);
    }   
}

// Convert Set to Array and save as JSON
const funnyNamesArray = Array.from(funnyNames);
const jsonData = JSON.stringify(funnyNamesArray, null, 2);

// Save to a JSON file
fs.writeFileSync('funny_names.json', jsonData, (err) => {
    if (err) throw err;
    console.log('File saved as funny_names.json');
});
