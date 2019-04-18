import React, { Component } from 'react'
import { connect } from 'react-redux';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleChange(e) {
    this.setState({})
  }

  handleSubmit(e) {

  }


  render() {

    return (
      <div className={ `signup_main ${active}` }>

        <div className="blurb">
          { "Enter your username & password to either sign up or log in to your existing account" }
        </div>

        <div className="signup_form__box">

          <form onSubmit>

            <div className="signup_form__username">
              <label> { "Username" } </label>
              <input type="text" />
            </div>

            <div className="signup_form__username">
              <label> { "Password" } </label>
              <input
                type="password"
                value={ this.state.password }
                onChange={ }
              />
            </div>

            <div className="signup_form__username">
              <label> { "Email (optional)" } </label>

            </div>

            <input type="submit" value="Submit" />

          </form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {})(SignUpForm);