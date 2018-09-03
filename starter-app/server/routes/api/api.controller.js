'use strict';



/**
 * Get all Service Appointments.
 * Send the array of Work Orders or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const testApi = (req, res) => {

    res.send({"Status":"Mustang"})
};

module.exports = {
	testApi
};