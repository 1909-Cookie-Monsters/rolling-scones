import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <div>
      <img src="https://cdn.dribbble.com/users/2362961/screenshots/5526231/44therollingscones_1x.png" />
      <h3>
        Established in 2019, The Rolling Scones is the hippest bakery in NYC!{' '}
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
