import Validator from 'validatorjs';

const rules = {
    type: 'required|string|Federal|State|Local',
    name: 'required|string'
};

const officeValidation = (data) => {
    const validation = new Validator(data, rules);
    const validationObj = { isValid: () => validation.passes() };
    if (validation.fails()) {
      validationObj.errors = validation.errors.all();
    }
    return Object.freeze(validationObj);
};

export default officeValidation;
