import $ from 'jquery';


function ifIncludesUpperCase(string) {
    const regex = /[A-Z]/;
    return regex.test(string)
}

function ifIncludesLowerCase(string) {
    const regex = /[a-z]/;
    return regex.test(string)
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}



export default {
    signUp: function ({ username, email, password, repeatPassword }) {
        const errors = [];
        if (username.length < 3) {
            $(`input[name='username']`).next().text('Username is to short')
            errors.push('error');
        } else {
            $(`input[name='username']`).next().text('')
        }

        if (!username.length) {
            $(`input[name='username']`).next().text('Please input a username')
            errors.push('error');
        }

        if (!isEmail(email)) {
            $(`input[name='email']`).next().text('Email is wrong')
            errors.push('error');
        } else {
            $(`input[name='email']`).next().text('')
        }

        if (!email.length) {
            $(`input[name='email']`).next().text('Please input an email')
            errors.push('error');
        }

        if (!ifIncludesUpperCase(password) || !ifIncludesLowerCase(password)) {
            $(`input[name='password']`).next().text('Password must include one uppercase and one lowercase letters')
            errors.push('error');
        } else {
            $(`input[name='password']`).next().text('')
        }

        if (!password.length) {
            $(`input[name='password']`).next().text('Please input a password')
            errors.push('error');
        }

        if (password !== repeatPassword) {
            $(`input[name='repeatPassword']`).next().text('Passwords don\'t match')
            errors.push('error');
        } else {
            $(`input[name='repeatPassword']`).next().text('')
        }

        return errors;

    },

    signIn: function ({ email, password }) {
        const errors = [];

        if (!isEmail(email)) {
            $(`input[name='email']`).next().text('Email is wrong')
            errors.push('error');
        } else {
            $(`input[name='email']`).next().text('')
        }

        if (!email.length) {
            $(`input[name='email']`).next().text('Please input an email')
            errors.push('error');
        }

        if (!password.length) {
            $(`input[name='password']`).next().text('Password cannot be empty')
            errors.push('error');
        } else {
            $(`input[name='password']`).next().text('')
        }

        return errors;

    }
}

