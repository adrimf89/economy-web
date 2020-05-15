import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CategoryForm from '../../forms/CategoryForm';
import { fetchCategory, editCategory } from '../../actions/categoriesAction';
import { Message } from 'semantic-ui-react';

class EditCategory extends React.Component {
    
    componentDidMount() {
        this.props.fetchCategory(this.props.match.params.categoryId);
    }

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
        this.props.editCategory(this.props.match.params.categoryId, formValues);
    };
  
    render(){
        return (
            <div>
                <h2>Edit category</h2>
                {this.renderError()}
                <CategoryForm
                    initialValues={_.pick(this.props.category, 'name', 'icon', 'description')} 
                    onSubmit={this.handleSubmit} 
                />
            </div>
        );
  }
};

const mapStateToProps = (state, ownProps) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        error: state.auth.error,
        category: state.categories[ownProps.match.params.categoryId]  
    };
};
  
export default connect(
    mapStateToProps,
    { fetchCategory, editCategory }
)(EditCategory);