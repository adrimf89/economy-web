import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { signOut } from '../../actions/authAction';

class Header extends React.Component {  
  onSignOutClick = () => {
    this.props.signOut();
};
  
  render(){
    if (!this.props.isSignedIn){
      return null;
    }
    
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
            Accounts
        </Link>
        <Link to="/categories" className="item">
          Categories
        </Link>
        <div className="right menu">
          <Button icon onClick={this.onSignOutClick}>
              <Icon name='power off' />
          </Button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Header);