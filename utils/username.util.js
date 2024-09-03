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

            console.log(randomName);
            return randomName;
        } catch (err) {
            console.error('Error reading or writing file:', err);
            return null;
        }
    }

    async getRandomAvatar() {
        const avatar = [
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F7e33cabf86e54cb5afa5cc6cd39c9fc9',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F66301bf72b844e63a78a409f3343463f',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2Fc54e81486c4b48b4af0fdf1a34465d09',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2Fa63f7f32c9634fabaab30297835b728c',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F792fc5042abb499f8a06c104ff05298a',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2Fa9d1ff2f290d4410bf3b569dd3fad287',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2Fc14037e8300e48c5b4d972ff4c1800b1',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F9f094e214398495383d6f64cf34ca79a',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2Fda3248b5ab9c42f3b8f9636a39ef9f48',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F5461fc0d25554dc3b28e3814004cac32',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F89a558e470ef420b881f78810898c90b',
            'https://cdn.builder.io/api/v1/image/assets%2F100e2d6f7ca14266bfead5d17c059b5c%2F5b24fd18029347939fcbf4a08559ac24'
        ];
        const randomIndex = Math.floor(Math.random() * avatar.length);
        return avatar[randomIndex];
    }
}

module.exports = new UserUtil();
