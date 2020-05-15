import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component{
    render(){
        let { component: Component, isSignedIn, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                isSignedIn
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        );
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};
  
export default connect(
    mapStateToProps,
    null
)(PrivateRoute);