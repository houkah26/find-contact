import React from "react";
import { Segment, Header } from "semantic-ui-react";

import "./index.css";

import FindContactForm from "../forms/FindContactForm";
import ContactList from "../ContactList";

const FindContactPage = () => {
  return (
    <Segment.Group raised className="FindContactPage">
      <Segment>
        <Header size="large" textAlign="center">
          Search Contact List
        </Header>
      </Segment>
      <Segment>
        <FindContactForm />
      </Segment>
      <Segment>
        <ContactList />
      </Segment>
    </Segment.Group>
  );
};

export default FindContactPage;
