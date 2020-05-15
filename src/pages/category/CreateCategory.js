import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../forms/CategoryForm';
import { createCategory } from '../../actions/categoriesAction';
import { Message } from 'semantic-ui-react';

class CreateCategory extends React.Component {
    
    renderError = () => {
        if (this.props.error){
            return (
                <Message negative>
                    <Message.Header>{this.props.error}</Message.Header>
                </Message>
            );
        }
    }

    handleSubmit = (formValues) => {
        this.props.createCategory(formValues);
    };
  
    render(){
        return (
            <div>
                <h2>Create new category</h2>
                {this.renderError()}
                <CategoryForm onSubmit={this.handleSubmit} />
            </div>
        );
  }
};

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        error: state.auth.error  
    };
};
  
export default connect(
    mapStateToProps,
    { createCategory }
)(CreateCategory);