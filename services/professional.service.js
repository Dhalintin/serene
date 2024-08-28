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
        const { name, type, specialization, experience, email, phone, day, startTime, endTime, rating, about, gender } = body;

        const contactInfo = [email, phone];
        const availability = { day, startTime, endTime };

        const newProf = new Professional({ name, type, expertise: specialization, experience, email, phone, contactInfo, availability, ratings: rating, about, gender });
        await newProf.save();
        return newProf;
    }

    async getAllProf() {
        const profs = await Professional.find({}).sort({ ratings: -1 });
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
        const { name, type, specialization, experience, email, phone, day, startTime, endTime, rating, about } = data;

        const contactInfo = [email, phone];
        const availability = [day, startTime, endTime];

        const updatedProf = await Professional.findOneAndUpdate({ _id: id }, { name, type, specialization, experience, contactInfo, availability, rating, about }, { new: true });

        return updatedProf;
    }

    async findByField(field) {
        const profs = await Professional.find({ type: field });
        return profs;
    }

    async findByGender(gender) {
        const profs = await Professional.find({}).sort({ gender: -1 });

        return profs;
    }

    async delete(id) {
        const prof = await Professional.findOneAndDelete({ id });

        return prof;
    }
}

module.exports = new ProfessionalService();
