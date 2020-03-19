import React, { useState } from "react"
import $ from 'jquery'
import { useMutation } from "@apollo/react-hooks";
import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import siteMapNav from '../site-map-nav/sign-up.json'
import css from './auth.module.scss'
import { SIGN_UP_USER } from "../graphql/mutations";
import { GET_CURRENT_USER } from '../graphql/queries'
import validate from '../helpers/formValidation'


const initialState = {
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
}

const Body = () => {

    const [state, setState] = useState(initialState)

    const { username, email, password, repeatPassword } = state;

    const handleChange = ({ name, value }) => {
        setState({ ...state, [name]: value })
    }

    const [signUpUser, attrs] = useMutation(SIGN_UP_USER, {
        variables: {
            username,
            email: email.toLowerCase(),
            password,
            language: "en"
        },
        onError: (err) => {
            console.log(err)
            $('.server-error-signUp').text('This email is taken')
        },
        update: (cache, { data: { signUpUser } }) => {
            const { token, user } = signUpUser;
            setState(initialState);
            localStorage.setItem('ssaavvaa-token', token);
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: {
                    getCurrentUser: user
                }
            });
        },
        onCompleted: () => {
            $('.server-error-signUp').text('')
        }
    });

    const handleSubmit = e => {
        e.preventDefault()

        $(`.${css.checkForm}`).text('')
        $('.server-error-signUp').text('')
        const ifValid = validate.signUp({ username, email, password, repeatPassword })

        if (ifValid.length) {
            $(`.${css.checkForm}`).text('Error , please fix the form')
        }
        if (!ifValid.length) {
            return signUpUser()
        }
        return null
    }

    const handleKeyUp = ({ keyCode, target: { name } }) => {
        if (keyCode === 13) {
            switch (name) {
                case 'username':
                    return $(`input[name='email']`).focus()
                case 'email':
                    return $(`input[name='password']`).focus()
                case 'password':
                    return $(`input[name='repeatPassword']`).focus()

                default: return null
            }
        }
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            return e.preventDefault()
        }
    }

    return (

        <div className={css.container}>
            <h1 className={css.heading}>Sign Up</h1>

            <form onKeyDown={e => handleKeyDown(e)} autoComplete="on" onSubmit={e => handleSubmit(e)} className={css.form}>
                <input
                    value={username}
                    onKeyUp={e => handleKeyUp(e)}
                    onChange={({ target }) => handleChange(target)}
                    name='username'
                    placeholder='username'
                    type="text" />
                <p className={css.error}></p>
                <input
                    onKeyUp={e => handleKeyUp(e)}
                    onChange={({ target }) => handleChange(target)}
                    value={email}
                    name='email'
                    placeholder='email'
                    type="email" />
                <p className={css.error}></p>
                <input
                    onKeyUp={e => handleKeyUp(e)}
                    onChange={({ target }) => handleChange(target)}
                    value={password}
                    name='password'
                    placeholder='password'
                    type="password" />
                <p className={css.error}></p>
                <input
                    onKeyUp={e => handleKeyUp(e)}
                    onChange={({ target }) => handleChange(target)}
                    value={repeatPassword}
                    name='repeatPassword'
                    placeholder='repeat password'
                    type="password" />
                <p className={css.error}></p>
                <p>Have an account ? <Link to='/sign-in'>Sign in</Link></p>
                <p className='server-error-signUp'
                    style={{ textAlign: "center", color: "red" }}>

                </p>
                <p className={css.checkForm}></p>
                <button type="submit">{attrs.loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>

    )
}


export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="sign-up" />
        <Body />
    </Layout>
)