
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const requiredValidator = value => {
    return value.trim() !== '';
};

 
const dateValidator = value => {
const re = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    return re.test(String(value).toLowerCase())  
};

const validate = (value, rules) => {
    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                              break;

            case 'isRequired': isValid = isValid && requiredValidator(value);
                               break;

                               case 'dateValidator': isValid = isValid && dateValidator(value);
                               break;


            default: isValid = true;
        }

    }

    return isValid;
};

export default validate;
