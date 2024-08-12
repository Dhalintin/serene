const UserService = require('../services/user.service.js');

class UserController{

    // User Signup
    async signup (req, res){

        const { walletid, username }  = req.body

        const existingUser = await UserService.getUser(walletid, username);

        if(existingUser){
            return res.status(400).json({
                success: false,
                messsage: "This wallet ID has already been used"
            })
        }

        try{
            const user = await UserService.addUser(walletid, username);

            res.status(200).json({
                success: true,
                message: "User added succesfully",
                data: user
            })

        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }


}

module.exports = new UserController();