const Professional = require('../models/professional.model');
const ProfessionalService = require('../services/professional.service');

class ProfessionalController {
    async create(req, res) {
        const { email, phone } = req.body;

        try {
            const existingProfessional = await ProfessionalService.findProf(email, phone);

            if (existingProfessional) {
                return res.status(401).json({
                    success: false,
                    message: 'User with this email/phone number already exists'
                });
            }

            const newProfessional = await ProfessionalService.addProf(req.body);

            return res.status(200).json({
                success: true,
                message: 'New Professional added Successfully!',
                data: newProfessional
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        const email = req.body.email;

        try {
            const professional = await ProfessionalService.findProf(email, phone);

            if (!professional) {
                return res.status(401).json({
                    success: false,
                    message: "User doesn't exists!"
                });
            }

            const token = jwt.sign(
                {
                    username: professional.name,
                    walletid: professional.phone
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '72h'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: professional,
                token: token
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async viewall(req, res) {
        try {
            const professional = await ProfessionalService.getAllProf();

            if (professional.length <= 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No professional found!'
                });
            }

            return res.status(200).json({
                sucesss: true,
                message: 'Successful!',
                data: professional
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async view(req, res) {
        const id = req.params.id;

        try {
            const prof = await ProfessionalService.getProf(id);

            if (prof.length <= 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Professional not found!'
                });
            }

            return res.status(200).json({
                sucesss: true,
                message: 'Successful!',
                data: prof
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async viewByCat(req, res) {
        try {
            const category = req.body.category;
            const professional = await ProfessionalService.getProfByCat(category);

            if (professional.length <= 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No professional found!'
                });
            }

            return res.status(200).json({
                sucesss: true,
                message: 'Successful!',
                data: professional,
                num: professional.length
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async edit(req, res) {
        const id = req.params.id;

        try {
            const updatedProf = await ProfessionalService.update(id, req.body);

            if (!updatedProf) {
                return res.status(404).json({
                    success: false,
                    message: 'Professional not found!'
                });
            }

            return res.status(200).json({
                success: true,
                messasge: 'Professional updated successfully!',
                data: updatedProf
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async field(req, res) {
        const queryParam = req.params.order;
        let profs;

        try {
            if (queryParam === 'rating') {
                profs = await ProfessionalService.getAllProf();
            } else if (queryParam === 'male' || queryParam === 'female') {
                profs = await ProfessionalService.findByGender(queryParam);
            } else {
                profs = await ProfessionalService.findByField(queryParam);
            }

            if (profs.length <= 0) {
                return res.status(404).json({
                    success: false,
                    message: `No ${field} found`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: profs
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        const id = req.body.body;

        try {
            const prof = await ProfessionalService.delete(id);

            if (!prof) {
                return res.status(404).json({
                    success: false,
                    message: 'No professional found!'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Deleted successfully!'
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ProfessionalController();
