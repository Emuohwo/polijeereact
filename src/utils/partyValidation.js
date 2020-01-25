import Validator from 'validatorjs';

const rules = {
    logourl: 'required',
    name: 'required|string',
    hqaddress: 'required'
};

const partyValidation = (data) => {
    const validation = new Validator(data, rules);
    const validationObj = { isValid: () => validation.passes() };
    if (validation.fails()) {
      validationObj.errors = validation.errors.all();
    }
    return Object.freeze(validationObj);
};

export default partyValidation;
