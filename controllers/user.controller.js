const UserService = require('../services/user.service.js');
const jwt = require('jsonwebtoken');
const UserUtil = require('../utils/username.util');

class UserController {
    // User Login/Signup
    async login(req, res) {
        try {
            const { walletid } = req.body;

            const user = await UserService.getUser(walletid);

            if (user) {
                const token = jwt.sign(
                    {
                        username: user.username,
                        walletid: user.walletid
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '72h'
                    }
                );

                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    newuser: false,
                    data: user,
                    token: token
                });
            } else {
                const username = await UserUtil.getRandomName();
                const avatar = await UserUtil.getRandomAvatar();

                const newUser = await UserService.addUser(walletid, username, avatar);

                const token = jwt.sign(
                    {
                        username: newUser.username,
                        walletid: newUser.walletid
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '72h'
                    }
                );

                return res.status(200).json({
                    success: true,
                    message: 'User added succesfully',
                    newuser: true,
                    data: newUser,
                    token: token
                });
            }
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllUsers(req, res) {
        const users = await UserService.allUsers();
        console.log(users);

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'No user found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successful!',
            data: users
        });
    }

    async getUser(req, res) {
        const userId = req.params.id;

        try {
            const user = UserService.getUserById(userId);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'No user found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User added succesfully',
                data: user
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new UserController();
