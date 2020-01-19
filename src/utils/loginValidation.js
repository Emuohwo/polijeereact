import Validator from 'validatorjs';

const rules = {
    email: 'required|email',
    password: 'required'
};

const loginValidation = data => {
    const validation = new Validator(data, rules);
    const validationObj = { isValid: () => validation.passes() };
    if (validation.fails()) {
        validationObj.getErrors = () => validation.errors.all();
    }
    return Object.freeze(validationObj);
};

export default loginValidation;