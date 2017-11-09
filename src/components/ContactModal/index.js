import React from "react";
import { Modal, Grid } from "semantic-ui-react";

import "./index.css";

const ContactModal = ({ contact, className }) => {
  const {
    givenName,
    surname,
    streetAddress,
    city,
    state,
    zipCode,
    telephoneNumber,
    username,
    emailAddress
  } = contact;

  const fullName = `${givenName} ${surname}`;
  const address = (
    <div>
      <div>{streetAddress}</div>
      <div>{`${city}, ${state} ${zipCode}`}</div>
    </div>
  );

  const labelColWidth = 4;
  const valueColWidth = 12;

  const renderRow = (label, value) => (
    <Grid.Row>
      <Grid.Column className="ContactModal__Label" width={labelColWidth}>
        {label}
      </Grid.Column>
      <Grid.Column width={valueColWidth}>{value}</Grid.Column>
    </Grid.Row>
  );

  return (
    <Modal
      className="ContactModal"
      trigger={<li className={className}>{fullName}</li>}
      size="tiny"
    >
      <Modal.Header>{fullName}</Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          {renderRow("Address", address)}
          {renderRow("Phone Number", telephoneNumber)}
          {renderRow("Username", username)}
          {renderRow("Email", emailAddress)}
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default ContactModal;
