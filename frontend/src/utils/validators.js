let emptyValidator = function(value, name) {
    if (value.length === 0)
        return {'isValid': false, 'errorMsg': name + ' cannot be empty'};

    return {'isValid': true, 'errorMsg': ''};
}

let emailValidator = function(value, name) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(value))
        return {'isValid': false, 'errorMsg': name + ' is not valid'};

    return {'isValid': true, 'errorMsg': ''};
}

let passwordValidator = function(value, name) {
    if (value.length < 8)
        return {'isValid': false, 'errorMsg': name + ' must have at least 8 characters'};

    const lowercaseLetterRegex = /[a-z]/;
    if (!lowercaseLetterRegex.test(value))
        return {'isValid': false, 'errorMsg': name + ' must include a lowercase letter'};

    const uppercaseLetterRegex = /[A-Z]/;
    if (!uppercaseLetterRegex.test(value))
        return {'isValid': false, 'errorMsg': name + ' must include a uppercase letter'};

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(value))
        return {'isValid': false, 'errorMsg': name + ' must include a number'};

    const specialSignRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialSignRegex.test(value))
        return {'isValid': false, 'errorMsg': name + ' must include a special sign'};

    return {'isValid': true, 'errorMsg': ''};
}

export {emptyValidator, emailValidator, passwordValidator}
