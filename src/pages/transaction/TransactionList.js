import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../actions/transactionsAction";
import { fetchAccount } from "../../actions/accountsAction";
import moment from "moment";

import {
  Container,
  Dropdown,
  Header,
  Icon,
  List,
  Segment,
  Table
} from "semantic-ui-react";
import { MessageLoading } from "../../components/app/Messages";

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.match.params.accountId);
    this.props.fetchTransactions(this.props.match.params.accountId);
  }

  renderTransactions() {
    return this.props.transactions.map(transaction => {
      return (
        <Table.Row key={transaction.id}>
          <Table.Cell>{transaction.description}</Table.Cell>
          <Table.Cell>
            {moment(transaction.date).format("DD-MM-YYYY HH:mm")}
          </Table.Cell>
          <Table.Cell>
            {transaction.amount} {transaction.currency}
          </Table.Cell>
          <Table.Cell>
            {!transaction.category && <Icon name="question circle outline" />}
            {transaction.category && <Icon name={transaction.category.icon} />}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {this.renderOperations(transaction)}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderOperations(transaction) {
    return (
      <Dropdown icon="cog" floating button className="icon">
        <Dropdown.Menu direction="left">
          <Dropdown.Header content="Select operation" />
          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            icon="edit"
            text="Edit"
            to={`/accounts/${this.props.match.params.accountId}/transactions/edit/${transaction.id}`}
          />
          <Dropdown.Item
            as={Link}
            icon="trash alternate"
            text="Delete"
            to={`/accounts/${this.props.match.params.accountId}/transactions/delete/${transaction.id}`}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <Link
            to={`/accounts/${this.props.match.params.accountId}/transactions/new`}
            className="ui button primary"
          >
            Create Transaction
          </Link>
        </div>
      );
    }
  }

  render() {
    const {
      account,
      transactions,
      loadingAccount,
      errorAccount,
      loadingTransactions,
      errorTransactions
    } = this.props;
    return (
      <Container>
        <Header as="h2" attached="top">
          Account: {account ? account.iban : "-"}
        </Header>
        {loadingAccount && <MessageLoading />}
        {!loadingAccount && !errorAccount && account && (
          <Segment attached>
            <List>
              <List.Item>
                <List.Icon name="balance" />
                <List.Content>
                  Balance: {account.currentBalance.balance}
                </List.Content>
              </List.Item>
            </List>
            <List>
              <List.Item>
                <List.Icon name="currency" />
                <List.Content>Currency: {account.currency}</List.Content>
              </List.Item>
            </List>
          </Segment>
        )}

        {!loadingAccount && !errorAccount && this.renderCreate()}

        {!loadingTransactions && !errorTransactions && transactions && (
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderTransactions()}</Table.Body>
          </Table>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    transactions: state.transactions.list,
    loadingTransactions: state.transactions.loading,
    errorTransactions: state.transactions.error,
    account: state.accounts.account,
    loadingAccount: state.accounts.loading,
    errorAccount: state.accounts.error
  };
};

export default connect(mapStateToProps, { fetchTransactions, fetchAccount })(
  TransactionList
);
