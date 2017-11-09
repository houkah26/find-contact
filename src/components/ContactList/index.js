import React from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

import {
  getIsContactRequesting,
  getContactErrorMessage,
  getContactMatches
} from "../../reducers";

import "./index.css";

import ContactModal from "../ContactModal";
import Loading from "../Loading";

const ContactList = ({ isLoading, matchedContacts }) => {
  const renderContactList = contacts =>
    contacts.length === 0 ? (
      <span>No Matched Contacts.</span>
    ) : (
      <ul>
        {contacts.map((contact, index) => (
          <ContactModal
            className="ContactList__ListItem"
            key={contact.id}
            contact={contact}
          />
        ))}
      </ul>
    );

  return (
    <div className="ContactList">
      <Header size="medium">Matched Contacts</Header>
      {isLoading ? <Loading /> : renderContactList(matchedContacts)}
    </div>
  );
};

const mapStateToProps = state => ({
  errorMessage: getContactErrorMessage(state),
  isLoading: getIsContactRequesting(state),
  matchedContacts: getContactMatches(state)
});

export default connect(mapStateToProps)(ContactList);
