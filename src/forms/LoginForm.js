import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment } from 'semantic-ui-react';

class LoginForm extends React.Component {

    renderUsername = ({ input, placeholder, meta: { touched, error } }) => {
        return (
          <div className="field">
            <Form.Input
                {...input}
                error={touched && error ? error : false}
                fluid 
                icon='user' 
                iconPosition='left'
                autoComplete="off" 
                placeholder={placeholder}
            />
          </div>
        );
    };

    renderPassword = ({ input, placeholder, meta: { touched, error } }) => {
        return (
          <div className="field">
            <Form.Input
                {...input}
                error={touched && error ? error : false}
                fluid 
                icon='lock' 
                iconPosition='left'
                autoComplete="off" 
                placeholder={placeholder}
                type='password'
            />
          </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <Form size='large' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Segment stacked>
                    <Field
                        component={this.renderUsername}
                        name="username"
                        placeholder='Username'
                    />
                    <Field
                        component={this.renderPassword}
                        name="password"
                        placeholder='Password'
                    />

                    <Form.Button color='teal' fluid size='large'>
                        Login
                    </Form.Button>
                </Segment>
            </Form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.username) {
      errors.username = 'Please enter a valid username';
    }
  
    if (!formValues.password) {
      errors.password = 'Please enter a valid password';
    }

    return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);