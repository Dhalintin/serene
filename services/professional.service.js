const Professional = require('../models/professional.model');

class ProfessionalService {
    async findProf(email, phone) {
        const existingProf = await Professional.findOne({
            $or: [{ email }, { phone }]
        });

        return existingProf;
    }

    async findById(id) {
        const prof = await Professional.findById({ _id: id });
        return prof;
    }

    async addProf(body) {
        const { name, type, specialization, experience, email, phone, day, startTime, endTime, rating } = body;

        const contactInfo = [email, phone];
        const availability = { day, startTime, endTime };

        const newProf = new Professional({ name, type, specialization, experience, email, phone, contactInfo, availability, rating });
        await newProf.save();
        return newProf;
    }

    async getAllProf() {
        const profs = await Professional.find({});
        return profs;
    }

    async getProf(id) {
        const prof = await Professional.find({ _id: id });
        return prof;
    }

    async getUserByMultipleId(senderId, recieverId) {
        const user = Professional.find({
            $or: [{ _id: senderId }, { _id: recieverId }]
        });
        return user;
    }

    async update(id, data) {
        const { name, type, specialization, experience, email, phone, day, startTime, endTime, rating } = data;

        const contactInfo = [email, phone];
        const availability = [day, startTime, endTime];

        const updatedProf = await Professional.findOneAndUpdate({ _id: id }, { name, type, specialization, experience, contactInfo, availability, rating }, { new: true });

        return updatedProf;
    }

    async findByField(field) {
        const profs = await Professional.find({ type: field });

        return profs;
    }

    async delete(id) {
        const prof = await Professional.findOneAndDelete({ id });

        return prof;
    }
}

module.exports = new ProfessionalService();
