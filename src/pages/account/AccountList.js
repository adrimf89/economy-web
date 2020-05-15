import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAccounts } from "../../actions/accountsAction";
import { Dropdown, Icon, Menu, Table } from "semantic-ui-react";
import { MessageLoading } from "../../components/app/Messages";

class AccountList extends React.Component {
  componentDidMount() {
    this.loadAccounts();
  }

  loadAccounts(params) {
    this.props.fetchAccounts(params);
  }

  renderIBAN(account) {
    //if (account.userId === this.props.currentUserId) {
    return (
      <Link to={`/accounts/${account.id}/transactions`}>{account.iban}</Link>
    );
    //} else {
    //    return account.iban;
    //}
  }

  renderOperations(account) {
    //if (account.userId === this.props.currentUserId) {
    return (
      <Dropdown icon="cog" floating button className="icon">
        <Dropdown.Menu direction="left">
          <Dropdown.Header content="Select operation" />
          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            icon="edit"
            text="Edit"
            to={`/accounts/edit/${account.id}`}
          />
          <Dropdown.Item
            as={Link}
            icon="chart line"
            text="Statistics"
            to={`/accounts/${account.id}/statistics`}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
    //}
  }

  renderList() {
    return this.props.data.map(account => {
      return (
        <Table.Row key={account.id}>
          <Table.Cell>{this.renderIBAN(account)}</Table.Cell>
          <Table.Cell>
            {account.currentBalance.balance} {account.currency}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {this.renderOperations(account)}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderPagination() {
    if (this.props.pagination) {
      return (
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            {`${this.props.pagination.currentPageElements} of ${this.props.pagination.totalElements}`}
            <Menu floated="right" pagination>
              <Menu.Item
                as="a"
                icon
                disabled={!this.props.pagination.prevPage}
                onClick={() =>
                  this.loadAccounts(this.props.pagination.prevPage)
                }
              >
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">{`${this.props.pagination.currentPage} of ${this.props.pagination.totalPages}`}</Menu.Item>
              <Menu.Item
                as="a"
                icon
                disabled={!this.props.pagination.nextPage}
                onClick={() =>
                  this.loadAccounts(this.props.pagination.nextPage)
                }
              >
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/accounts/new" className="ui button primary">
            Create Account
          </Link>
        </div>
      );
    }
  }

  render() {
    const { loading, error, data } = this.props;

    return (
      <div>
        <h2>Accounts</h2>
        {!loading && !error && this.renderCreate()}

        {loading && <MessageLoading />}
        {!loading && !error && data && (
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>IBAN</Table.HeaderCell>
                <Table.HeaderCell>Balance</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderList()}</Table.Body>
            <Table.Footer>{this.renderPagination()}</Table.Footer>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.accounts.loading,
    error: state.accounts.error,
    data: state.accounts.data,
    pagination: state.accounts.pagination,
    currentUserName: state.auth.username,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchAccounts })(AccountList);
