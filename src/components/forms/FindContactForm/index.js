import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Form, Message, Icon } from "semantic-ui-react";

import { findContact, clearFindContact } from "../../../actions/contact";
import {
  getIsContactRequesting,
  getContactErrorMessage,
  getContactMatches
} from "../../../reducers";
import renderFields from "../components/renderFields";
// import DismissibleMessage from "../../messages/DismissibleMessage";

const inputFields = [
  {
    name: "searchKey",
    displayName: "Search By:",
    type: "select",
    selectOptions: [
      { key: "First Name", value: "givenName" },
      { key: "Last Name", value: "surname" }
    ],
    width: 7
  },
  {
    name: "searchValue",
    displayName: "Name (at least 3 characters, case insensitive)",
    width: 12
  }
];

// Form validation for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.searchKey) {
    errors.searchKey = " ";
  }

  if (!formProps.searchValue || formProps.searchValue.length < 3) {
    errors.searchValue = "Enter at least three characters";
  }

  return errors;
};

class FindContactForm extends Component {
  handleFormSubmit = formProps => {
    // Clear contact store before making new request
    this.props.clearFindContact();

    this.props.findContact(formProps);
  };

  render() {
    const {
      handleSubmit, // Submit handler for redux-form
      errorMessage,
      isLoading
    } = this.props;

    const containsError = errorMessage.length > 0;

    return (
      <Form
        error={containsError}
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <Message error header="Error:" content={errorMessage} />
        <div>
          <Form.Group>{renderFields(inputFields)}</Form.Group>
          <Form.Button color="blue" loading={isLoading}>
            <Icon name="search" />Search
          </Form.Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: getContactErrorMessage(state),
  isLoading: getIsContactRequesting(state),
  matchedContacts: getContactMatches(state)
});

const createForm = reduxForm({
  form: "findContactForm",
  validate
});

export default connect(mapStateToProps, { findContact, clearFindContact })(
  createForm(FindContactForm)
);
