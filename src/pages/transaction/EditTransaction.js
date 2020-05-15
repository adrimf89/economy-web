import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import TransactionForm from "../../forms/TransactionForm";
import {
  editTransaction,
  fetchTransaction
} from "../../actions/transactionsAction";
import { fetchAccount } from "../../actions/accountsAction";
import { Message } from "semantic-ui-react";

class EditTransaction extends React.Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.match.params.accountId);
    this.props.fetchTransaction(this.props.match.params.transactionId);
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
    this.props.editTransaction(
      parseInt(this.props.match.params.transactionId),
      formValues,
      parseInt(this.props.match.params.accountId)
    );
  };

  render() {
    return (
      <div>
        <h2>Edit transaction</h2>
        {this.renderError()}
        <TransactionForm
          initialValues={_.pick(
            this.props.transaction,
            "currency",
            "date",
            "description",
            "categoryId",
            "amount",
            "info",
            "accountId"
          )}
          onSubmit={this.handleSubmit}
          loadingAccount={this.props.loadingAccount}
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
    loadingAccount: state.accounts.loading,
    transaction: {
      ...state.transactions.transaction,
      categoryId: _.get(state.transactions.transaction, "category.id")
    }
  };
};

export default connect(mapStateToProps, {
  editTransaction,
  fetchTransaction,
  fetchAccount
})(EditTransaction);
