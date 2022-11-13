export function validLogin(email, password) {
    let errors = [];

    if (!email) {
        errors.push('Email cannot be empty')
    }
    if (!password) {
        errors.push('Password cannot be empty')
    }

    if (!emailIsValid(email)) {
        errors.push('Email must be a valid Email')
    }

    return errors
}

export function validateSignUp(email, password, confirmPassword, name, age, phone) {
    let errors = validLogin(email, password)

    if (password !== confirmPassword) {
        errors.push('Password and Confirm password must be same')
    }

    if (!name) {
        errors.push('Name cannot be empty')
    }

    if (!phone) {
        errors.push('Phone cannot be empty')
    }

    return errors
}

export function emailIsValid(email) {
    return email.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}