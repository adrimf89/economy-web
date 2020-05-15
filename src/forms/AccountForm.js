import React from "react";
import currencyApi from "../apis/currencyApi";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import _ from "lodash";

import { MessageLoading } from "../components/app/Messages";

class AccountForm extends React.Component {
  state = {
    currencies: null
  };

  componentDidMount() {
    let currencyList = JSON.parse(localStorage.getItem("currencies"));

    if (currencyList == null) {
      currencyApi
        .get("/currencies")
        .then(response => {
          let currencyList = _.orderBy(
            _.map(response.data.results, currency => {
              return {
                key: currency.id,
                text: currency.id + " - " + currency.currencyName,
                value: currency.id
              };
            }),
            ["key"],
            ["asc"]
          );

          localStorage.setItem("currencies", JSON.stringify(currencyList));
          this.setState({ currencies: currencyList });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ currencies: currencyList });
    }
  }

  renderInput = ({
    input,
    label,
    name,
    placeholder,
    required,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <Form.Input
          {...input}
          label={label}
          name={name}
          placeholder={placeholder}
          required={required}
          error={touched && error ? error : false}
        />
      </div>
    );
  };

  renderSelect = ({
    input,
    label,
    name,
    placeholder,
    options,
    required,
    meta: { touched, error }
  }) => (
    <Form.Select
      {...input}
      label={label}
      name={name}
      onChange={(e, { value }) => input.onChange(value)}
      options={options}
      placeholder={placeholder}
      required={required}
      error={touched && error ? error : false}
    />
  );

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    if (this.state.currencies == null) {
      return <MessageLoading />;
    }

    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        loading={this.props.loading}
      >
        <Form.Group widths="equal">
          <Field
            component={this.renderInput}
            label="Description"
            name="description"
            placeholder="Description"
            required
          />
          <Field
            component={this.renderInput}
            label="IBAN"
            name="iban"
            placeholder="IBAN"
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={this.renderInput}
            label="Initial balance"
            name="initialBalance"
            placeholder="0.0"
            required
          />
          <Field
            component={this.renderSelect}
            label="Currency"
            name="currency"
            options={this.state.currencies}
            placeholder="Currency"
            required
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Button primary>Submit</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.description) {
    errors.description = "Please enter a valid description";
  }

  if (!formValues.iban) {
    errors.iban = "Please enter a valid IBAN";
  }

  if (!formValues.initialBalance) {
    errors.initialBalance = "Please enter a valid balance";
  }

  if (!formValues.currency) {
    errors.currency = "Please enter a valid currency";
  }

  return errors;
};

export default reduxForm({
  form: "accountForm",
  validate
})(AccountForm);
