import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import TransactionForm from "../../forms/TransactionForm";
import { createTransaction } from "../../actions/transactionsAction";
import { fetchAccount } from "../../actions/accountsAction";
import { Message } from "semantic-ui-react";
import moment from "moment";

class CreateTransaction extends React.Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.match.params.accountId);
  }

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
    this.props.createTransaction(
      formValues,
      parseInt(this.props.match.params.accountId)
    );
  };

  render() {
    return (
      <div>
        <h2>Create new transaction</h2>
        {this.renderError()}
        <TransactionForm
          initialValues={{
            ..._.pick(this.props.account, "currency"),
            date: moment().format()
          }}
          onSubmit={this.handleSubmit}
          loading={this.props.loadingAccount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    error: state.auth.error,
    account: state.accounts.account,
    loadingAccount: state.accounts.loading
  };
};

export default connect(mapStateToProps, { createTransaction, fetchAccount })(
  CreateTransaction
);
