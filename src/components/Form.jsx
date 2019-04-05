import React, { useEffect } from "react";
import { Row, Col } from "react-grid-system";

import { PanelMixin } from "../shared/mixins";

import Input, { useInput } from "./Input";
import Button from "./Button";
import styled from "styled-components";

const AddForm = ({ users, onSubmit }) => {
  const nicknameInput = useInput();
  const emailInput = useInput();
  const ipInput = useInput();

  useEffect(() => {
    users.map(user => {
      if (user.nickname === nicknameInput.value) {
        nicknameInput.onError("This nickname already exists");
      }
      if (user.email === emailInput.value) {
        emailInput.onError("This e-mail already exists");
      }
      return user;
    });
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!disabled) {
      onSubmit({
        timestamp: new Date().getUTCMilliseconds(),
        nickname: nicknameInput.value,
        email: emailInput.value,
        ip: ipInput.value
      });

      nicknameInput.onReset();
      emailInput.onReset();
      ipInput.onReset();
    }
  };

  const disabled =
    !nicknameInput.value ||
    !emailInput.value ||
    !ipInput.value ||
    nicknameInput.error ||
    emailInput.error ||
    ipInput.error;

  return (
    <Row>
      <Col xs={5}>
        <Form onSubmit={e => handleSubmit(e)}>
          <Input
            id="nickname"
            placeholder="Enter nickname"
            {...nicknameInput}
          />
          <Input
            id="email"
            label="E-mail"
            placeholder="Enter e-mail"
            {...emailInput}
          />
          <Input
            id="ip"
            label="IP address"
            placeholder="Enter IP address"
            {...ipInput}
          />
          <Button type="submit" disabled={disabled}>
            Add user
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddForm;

const Form = styled.form`
  ${PanelMixin};
`;
