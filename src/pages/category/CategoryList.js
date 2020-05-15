import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../actions/categoriesAction";
import { Dropdown, Icon, Table } from "semantic-ui-react";

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderOperations(cat) {
    return (
      <Dropdown icon="cog" floating button className="icon">
        <Dropdown.Menu direction="left">
          <Dropdown.Header content="Select operation" />
          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            icon="edit"
            text="Edit"
            to={`/categories/edit/${cat.id}`}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderList() {
    return this.props.categories.map(cat => {
      return (
        <Table.Row key={cat.id}>
          <Table.Cell>
            <Icon name={cat.icon} /> {cat.name}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {this.renderOperations(cat)}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/categories/new" className="ui button primary">
            Create Category
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderList()}</Table.Body>
        </Table>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: Object.values(state.categories),
    currentUserName: state.auth.username,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchCategories })(CategoryList);
