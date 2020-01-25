import Validator from 'validatorjs';

const rules = {
    office: 'required|number',
    party: 'required|number',
    candidate: 'required|number'
};

const candidateValidation = (data) => {
    const validation = new Validator(data, rules);
    const validationObj = { isValid: () => validation.passes() };
    if (validation.fails()) {
      validationObj.errors = validation.errors.all();
    }
    return Object.freeze(validationObj);
};

export default candidateValidation;
