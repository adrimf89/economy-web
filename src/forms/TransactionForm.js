import React from "react";
import currencyApi from "../apis/currencyApi";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import _ from "lodash";
import { fetchCategories } from "../actions/categoriesAction";
import moment from "moment";

class TransactionForm extends React.Component {
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

    this.props.fetchCategories();
  }

  getCategories() {
    return _.orderBy(
      _.map(this.props.categories, cat => {
        return { key: cat.id, text: cat.name, value: cat.id, icon: cat.icon };
      }),
      ["name"],
      ["asc"]
    );
  }

  renderInput = ({
    input,
    label,
    name,
    placeholder,
    disabled,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <Form.Input
          {...input}
          label={label}
          name={name}
          placeholder={placeholder}
          error={touched && error ? error : false}
          disabled={disabled}
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
    meta: { touched, error }
  }) => (
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

  renderTextArea = ({
    input,
    label,
    name,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <Form.TextArea
          {...input}
          label={label}
          name={name}
          placeholder={placeholder}
          error={touched && error ? error : false}
        />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    if (this.state.currencies == null) {
      return <div>Loading</div>;
    }

    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group widths="equal">
          <Field
            component={this.renderInput}
            label="Date"
            name="date"
            placeholder="DD-MM-YYYY HH:mm"
          />
          <Field
            component={this.renderInput}
            label="Description"
            name="description"
            placeholder="Description"
          />
          <Field
            component={this.renderSelect}
            label="Category"
            name="categoryId"
            options={this.getCategories()}
            placeholder="Category"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={this.renderInput}
            label="Amount"
            name="amount"
            placeholder="0.0"
          />
          <Field
            component={this.renderSelect}
            label="Currency"
            name="currency"
            options={this.state.currencies}
            placeholder="Currency"
          />
          <Field
            component={this.renderInput}
            label="Currency amount"
            name="currencyAmount"
            placeholder="0.0"
            disabled
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={this.renderTextArea}
            label="Extra information"
            name="info"
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

  if (!formValues.date) {
    errors.date = "Date is mandatory";
  } else if (!moment(formValues.date).isValid()) {
    errors.date = "Invalid date format";
  }

  if (!formValues.description) {
    errors.description = "Please enter a valid description";
  }

  if (!formValues.categoryId) {
    errors.categoryId = "Please enter a valid category";
  }

  if (!formValues.amount) {
    errors.amount = "Please enter a valid amount";
  }

  if (!formValues.currency) {
    errors.currency = "Please enter a valid currency";
  }

  return errors;
};

const mapStateToProps = state => {
  return {
    categories: Object.values(state.categories)
  };
};

export default connect(mapStateToProps, { fetchCategories })(
  reduxForm({
    form: "transactionForm",
    validate,
    enableReinitialize: true
  })(TransactionForm)
);
