import React from "react";
import { connect } from "react-redux";
import AccountForm from "../../forms/AccountForm";
import { createAccount } from "../../actions/accountsAction";
import { Message } from "semantic-ui-react";

class CreateAccount extends React.Component {
  renderError = () => {
    if (this.props.error) {
      return (
        <Message negative>
          <Message.Header>{this.props.error}</Message.Header>
        </Message>
      );
    }
  };

  handleSubmit = formValues => {
    this.props.createAccount(formValues);
  };

  render() {
    return (
      <div>
        <h2>Create new account</h2>
        <AccountForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    error: state.accounts.createError,
    loading: state.accounts.createLoading
  };
};

export default connect(mapStateToProps, { createAccount })(CreateAccount);
