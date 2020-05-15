import React from 'react';
import currencyApi from '../apis/currencyApi';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import _ from 'lodash';

const categoryOptions = [
    { key: 'money', text: 'Money', value: 'money bill alternate outline', icon: 'money bill alternate outline' },
    { key: 'home', text: 'Home', value: 'home', icon: 'home' },
    { key: 'car', text: 'Car', value: 'car', icon: 'car' },
    { key: 'gift', text: 'Gift', value: 'gift', icon: 'gift' },
    { key: 'coffee', text: 'Coffee', value: 'coffee', icon: 'coffee' },
    { key: 'phone', text: 'Phone', value: 'phone', icon: 'phone' },
    { key: 'heartbeat', text: 'Heart', value: 'heartbeat', icon: 'heartbeat' },
    { key: 'bicycle', text: 'Bicycle', value: 'bicycle', icon: 'bicycle' },
    { key: 'gamepad', text: 'Game', value: 'gamepad', icon: 'gamepad' },
    { key: 'cart', text: 'Shopping cart', value: 'shopping cart', icon: 'shopping cart' },
    { key: 'plane', text: 'Plane', value: 'plane', icon: 'plane' },
    { key: 'subway', text: 'Subway', value: 'subway', icon: 'subway' },
    { key: 'utensils', text: 'Utensils', value: 'utensils', icon: 'utensils' },
    { key: 'pills', text: 'Pills', value: 'pills', icon: 'pills' },
    { key: 'bag', text: 'Shopping bag', value: 'shopping bag', icon: 'shopping bag' }
  ]

class CategoryForm extends React.Component {

    componentDidMount() {
        let currencyList = JSON.parse(localStorage.getItem('currencies'));

        if (currencyList == null){
            currencyApi.get('/currencies')
                .then( response => {                    
                    let currencyList = _.orderBy(_.map(response.data.results, currency => { 
                            return { key: currency.id, text: currency.id +" - "+ currency.currencyName, value: currency.id } 
                        }), ['key'], ['asc']);

                    localStorage.setItem('currencies', JSON.stringify(currencyList));
                    this.setState({currencies: currencyList});
                })
                .catch( ( error ) => {
                    console.log(error);
                });
        } else {
            this.setState({currencies: currencyList});
        }
    }

    renderInput = ({ input, label, name, placeholder, meta: { touched, error } }) => {
        return (
          <div className="field">
            <Form.Input
                {...input}
                label={label}
                name={name}
                placeholder={placeholder}
                error={touched && error ? error : false}
            />
          </div>
        );
    };

    renderSelect = ({ input, label, name, placeholder, options, meta: { touched, error } }) => (
        <Form.Select
            {...input}  
            label={label}
            name={name}
            onChange={(e, { value }) => input.onChange(value)}
            options={options}
            placeholder={placeholder}
            error={touched && error ? error : false}
        />
      );

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Form.Group widths="equal">
                    <Field
                        component={this.renderInput}
                        label="Name"
                        name="name"
                        placeholder="Category name"
                    />
                    <Field
                        component={this.renderSelect}
                        label="Icon"
                        name="icon"
                        options={categoryOptions}
                        placeholder="Category icon"
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Field
                        component={this.renderInput}
                        label="Description"
                        name="description"
                        placeholder="Description"
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Button primary>
                        Submit
                    </Form.Button>
                </Form.Group>
            </Form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
      errors.name = 'Please enter a valid category name';
    }
  
    if (!formValues.description) {
      errors.description = 'Please enter a valid category icon';
    }

    if (!formValues.icon) {
        errors.icon = 'Please enter a valid description';
      }

    return errors;
};

export default reduxForm({
  form: 'categoryForm',
  validate
})(CategoryForm);