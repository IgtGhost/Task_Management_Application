/**
 * Validates that a required field has a defined and non-null value.
 * Throws an error if the field's value is undefined, null, or an empty string.
 *
 * @param {Object} param - Parameter object containing field details.
 * @param {string} param.fieldName - The name of the field being validated.
 * @param {*} param.value - The value of the field to validate.
 * @throws {Error} - Throws an error if validation fails.
 */
function validateRequiredFields({ fieldName, value }) {
    if (value === undefined || value === null || value === "") {
        throw new Error(`The field '${fieldName}' is required and cannot be empty.`);
    }
}

module.exports = { validateRequiredFields };
