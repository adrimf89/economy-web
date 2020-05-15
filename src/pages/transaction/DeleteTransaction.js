import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../components/app/Modal';
import history from '../../history';
import { fetchTransaction, deleteTransaction } from '../../actions/transactionsAction';

class DeleteTransaction extends React.Component {
  componentDidMount() {
    this.props.fetchTransaction(this.props.match.params.transactionId);
  }

  renderActions() {
    const { transactionId } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteTransaction(transactionId, this.props.match.params.accountId)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/accounts/${this.props.match.params.accountId}/transactions`} className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.transaction) {
      return 'Are you sure you want to delete this transaction?';
    }

    return `Are you sure you want to delete the transaction: ${
      this.props.transaction.description
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete transaction"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/accounts/${this.props.match.params.accountId}/transactions`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { transaction: state.transactions[ownProps.match.params.transactionId] };
};

export default connect(
  mapStateToProps,
  { fetchTransaction, deleteTransaction }
)(DeleteTransaction);