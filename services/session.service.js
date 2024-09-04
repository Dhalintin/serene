const Session = require('../models/session.model');

class SessionService {
    async seeSessions() {
        const sessions = Session.find({});
        return sessions;
    }

    async createSession(userId, professionalId, sessionType, date, duration) {
        const sess = new Session({ userId, professionalId, sessionType, date, duration });
        const link = `https://serene-video-call.onrender.com/${sess._id}`;
        const session = new Session({ _id: sess._id, userId, professionalId, sessionType, date, duration, link });
        session.save();
        return session;
    }

    async findById(id) {
        const session = await Session.findById(id)
            .populate('userId', '-createdAt -updatedAt -walletid  -__v')
            .populate('professionalId', '-gender -about -email -phone -expertise -experience -ratings -availability -category -createdAt -updatedAt, -__v')
            .exec();
        return session;
    }

    async confirm(id) {
        const confirmSession = Session.findOneAndUpdate({ _id: id }, { status: 'confirmed' }, { new: true });
        return confirmSession;
    }

    async cancel(id) {
        const cancelSession = Session.findOneAndUpdate({ _id: id }, { status: 'cancel' }, { new: true });
        return cancelSession;
    }

    async complete(id) {
        const completeSession = Session.findOneAndUpdate({ _id: id }, { status: 'complete' }, { new: true });
        return completeSession;
    }

    async delete(id) {
        const deleteSession = Session.findOneAndDelete(id);
        return deleteSession;
    }

    async update(sessionId, updatedData) {
        const updateObject = {};
        for (const key in updatedData) {
            if (updatedData.hasOwnProperty(key)) {
                updateObject[`$set.${key}`] = updatedData[key];
            }
        }

        const updatedSession = await Professional.findOneAndUpdate({ _id: sessionId }, updateObject, { new: true });

        return updatedSession;
    }

    async findByProf(profId) {
        const appointments = Session.find({ professionalId: profId });
        return appointments;
    }
}

module.exports = new SessionService();
