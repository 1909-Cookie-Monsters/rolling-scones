import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import {Container, Button, Form, Icon} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Container text style={{marginTop: '7em'}}>
        <Form onSubmit={handleSubmit} name={name} className="authForm">
          {displayName === 'Sign Up' ? (
            <Container>
              <Form.Field className="nameFields">
                <label>First Name</label>
                <input name="firstName" placeholder="First Name" />
              </Form.Field>
              <Form.Field className="nameFields">
                <label>Last Name</label>
                <input name="lastName" placeholder="Last Name" />
              </Form.Field>
            </Container>
          ) : null}
          <Form.Field>
            <label>Email</label>
            <input name="email" placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </Form.Field>
          <Button type="submit">{displayName}</Button>
          <Button as="a" href="/auth/google" color="google plus">
            <Icon name="google plus" /> {displayName} with Google
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
