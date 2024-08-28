const UserService = require('../services/user.service');
const ProfessionalService = require('../services/professional.service');
const SessionService = require('../services/session.service');

class SessionController {
    async viewall(req, res) {
        try {
            const sessions = await SessionService.seeSessions();

            if (sessions.length <= 0) {
                return res.status(404).json({
                    success: false,
                    message: 'There are no sessions'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: sessions
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async view(req, res) {
        try {
            const id = req.body.id;
            const session = await SessionService.findById(id);

            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found!'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: session
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async appointment(req, res) {
        try {
            const profId = req.params.id;

            const prof = ProfessionalService.findById(profId);

            if (!prof) {
                return res.status(404).json({
                    success: false,
                    message: 'Please login as Professionals to see'
                });
            }

            const appointments = SessionService.findByProf(profId);

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: appointments
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async create(req, res) {
        const { userId, professionalId, sessionType, date, duration } = req.body;

        try {
            const existingUser = await UserService.getUserById(userId);
            const existingProf = await ProfessionalService.findById(professionalId);

            if (!existingUser || !existingProf) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to book session!'
                });
            }

            const newSession = await SessionService.createSession(userId, professionalId, sessionType, date, duration);

            return res.status(200).json({
                success: true,
                message: 'Session scheduled successfully',
                data: newSession
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async confirm(req, res) {
        const id = req.params.id;
        try {
            const existingSession = await SessionService.findById(id);

            if (!existingSession) {
                return res.status(404).json({
                    success: false,
                    message: "Session doesn't exist!"
                });
            }

            const confirmedSession = await SessionService.confirm(id);

            return res.status(200).json({
                success: true,
                message: 'Session confirmed!',
                data: confirmedSession
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async complete(req, res) {
        const id = req.params.id;
        try {
            const existingSession = await SessionService.findById(id);

            if (!existingSession) {
                return res.status(404).json({
                    success: false,
                    message: "Session doesn't exist!"
                });
            }

            const completedSession = SessionService.complete(id);

            return res.status(200).json({
                success: true,
                message: 'Session confirmed!',
                data: completedSession
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async cancel(req, res) {
        const id = req.params.id;
        try {
            const existingSession = await SessionService.findById(id);

            if (!existingSession) {
                return res.status(404).json({
                    success: false,
                    message: "Session doesn't exist!"
                });
            }

            const cancelSession = SessionService.cancel(id);

            return res.status(200).json({
                success: true,
                message: 'Session confirmed!',
                data: cancelSession
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const existingSession = await SessionService.findById(id);

            if (!existingSession) {
                return res.status(404).json({
                    success: false,
                    message: "Session doesn't exist!"
                });
            }

            const updatedSession = await SessionService.update(id, req.body);

            return res.status(200).json({
                success: true,
                message: 'Session updated successfully!',
                data: updatedSession
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const id = req.params.id;

            const existingSession = await SessionService.findById(id);

            if (!existingSession) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found!'
                });
            }

            if (existingSession.status === 'scheduled') {
                const prof = await SessionService.delete(id);

                return res.status(200).json({
                    success: true,
                    message: 'Deleted successfully!'
                });
            }

            return res.status(400).json({
                success: false,
                message: 'This session cannot be deleted!'
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new SessionController();
