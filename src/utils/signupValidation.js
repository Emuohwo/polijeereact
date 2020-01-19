import Validator from 'validatorjs';

const rules = {
    firstname: 'required|string',
    lastname: 'required|string',
    // othernames: 'required',
    email: 'required|email',
    password: 'required|min:5',
    phonenumber: 'required',
    passporturl: 'required'
};

const signupValidation = (data) => {
    const validation = new Validator(data, rules);
    const validationObj = { isValid: () => validation.passes() };
    if (validation.fails()) {
        validationObj.getErrors = () => validation.errors.all();
    }
    return Object.freeze(validationObj);
};

export default signupValidation;