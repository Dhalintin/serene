const fs = require('fs');
const path = require('path');

class UserUtil {
    async getRandomName() {
        const filePath = path.join(__dirname, './', 'names.json');
      
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          const namesArray = JSON.parse(data);
      
          if (namesArray.length === 0) {
            console.error('Names array is empty');
            return null;
          }
      
          const randomIndex = Math.floor(Math.random() * namesArray.length);
          const randomName = namesArray.splice(randomIndex, 1)[0];
      
          // Optionally write the modified array back to the file
          fs.writeFileSync(filePath, JSON.stringify(namesArray));

          console.log(randomName)
          return randomName;
        } catch (err) {
          console.error('Error reading or writing file:', err);
          return null;
        }
      }
}

module.exports = new UserUtil();

