const handleValidationError = (res, e, field) => {
    if (e.errors[field]) {
        res.status(406).send({
            status: 'Fail',
            message: e.errors[field].message
        });
        return true; // error found, response sent
    }
    return false; // no error found
};



// usage
module.exports = handleValidationError;
