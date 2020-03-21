import React, { useState } from "react"
import $ from 'jquery'
import { useMutation } from "@apollo/react-hooks";
import Layout from "../components/layout"
import SEO from "../components/seo"
import siteMapNav from '../site-map-nav/sign-in.json'
import css from './auth.module.scss'
import { SIGN_IN_USER } from "../graphql/mutations";
import { GET_CURRENT_USER } from '../graphql/queries'
import validate from '../helpers/formValidation'


const initialState = {
    email: "",
    password: "",
}


function Body() {

    const [state, setState] = useState(initialState)

    const { email, password } = state;


    const [signInUser, attrs] = useMutation(SIGN_IN_USER, {
        variables: {
            email: email.toLowerCase(),
            password,
            language: "en"
        },
        onError: (err) => {

            $(`.${css.checkForm}`).text(err.message.replace('GraphQL error:', ''))
        },
        update: (cache, { data: { signInUser } }) => {
            const { token, user } = signInUser;
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
            $(`.${css.checkForm}`).text('')
        }
    });

    function handleChange({ target: { name, value } }) {

        setState({ ...state, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const ifValid = validate.signIn({ email, password })
        if (!ifValid.length) {
            return signInUser()
        }
        return null
    }

    function handleKeyUp({ keyCode, target: { name } }) {
        if (keyCode === 13) {
            switch (name) {
                case 'email':
                    return $(`input[name='password']`).focus()
                case 'password':
                    const ifValid = validate.signIn({ email, password })
                    if (!ifValid.length) {
                        return signInUser()
                    }
                    return null

                default: return null
            }
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            return e.preventDefault()
        }
    }

    return (
        <div className='container'>
            <h1 className={css.heading}>Sign In</h1>

            <form onKeyDown={handleKeyDown} autoComplete="on" onSubmit={handleSubmit} className={css.form}>
                <input
                    onKeyUp={handleKeyUp}
                    onChange={handleChange}
                    value={email}
                    name='email'
                    placeholder='email'
                    type="email" />
                <p className={css.error}></p>
                <input
                    onKeyUp={handleKeyUp}
                    onChange={handleChange}
                    value={password}
                    name='password'
                    placeholder='password'
                    type="password" />
                <p className={css.error}></p>

                <p className={css.checkForm}></p>
                <button type="submit">{attrs.loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}

export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="sign-in" />
        <Body />
    </Layout>
)