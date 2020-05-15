import React from "react";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { Grid, Header, Image, Message } from "semantic-ui-react";
import { signIn } from "../actions/authAction";

class Login extends React.Component {
  renderError = () => {
    if (this.props.error) {
      return (
        <Message negative>
          <Message.Header>{this.props.error.message}</Message.Header>
        </Message>
      );
    }
  };

  handleSubmit = formValues => {
    this.props.signIn(formValues);
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <LoginForm onSubmit={this.handleSubmit} />
          {this.renderError()}
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { signIn })(Login);
