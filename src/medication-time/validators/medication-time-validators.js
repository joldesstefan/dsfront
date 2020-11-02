
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const requiredValidator = value => {
    return value.trim() !== '';
};

 
const timeValidator = value => {
const re = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
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

                               case 'timeValidator': isValid = isValid && timeValidator(value);
                               break;


            default: isValid = true;
        }

    }

    return isValid;
};

export default validate;
