import React from "react";
import { Row, Col } from "react-grid-system";

import { PanelMixin } from "../shared/mixins";

import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

const AddForm = ({ nickname, email, ip, onChange, onSubmit }) => (
  <Row>
    <Col xs={5}>
      <Form onSubmit={onSubmit}>
        <Input
          id="nickname"
          placeholder="Enter nickname"
          value={nickname}
          onChange={e => onChange(e)}
        />
        <Input
          id="email"
          label="E-mail"
          placeholder="Enter e-mail"
          value={email}
          onChange={e => onChange(e)}
        />
        <Input
          id="ip"
          label="IP address"
          placeholder="Enter IP address"
          value={ip}
          onChange={e => onChange(e)}
        />
        <Button type="submit">Add user</Button>
      </Form>
    </Col>
  </Row>
);

export default AddForm;

const Form = styled.form`
  ${PanelMixin};
`;