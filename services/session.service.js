const Session = require('../models/session.model');

class SessionService {
    async seeSessions() {
        const sessions = Session.find({});
        return sessions;
    }

    async createSession(userId, professionalId, sessionType, date, duration) {
        const session = new Session({ userId, professionalId, sessionType, date, duration });
        session.save();
        return session;
    }

    async findById(id) {
        const session = await Session.findOne({ _id: id });
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
