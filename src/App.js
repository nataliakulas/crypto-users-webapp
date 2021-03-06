import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import styled from "styled-components";

import color from "./shared/colors";
import { modal_type } from "./shared/types";

import GlobalStyle from "./components/Global";
import { H1 } from "./components/Fonts";

import AddForm from "./containers/Form";
import UserTable from "./containers/Table";
import Modal from "./components/Modal";
import Button from "./components/Button";

class App extends Component {
  state = {
    users: [],
    modal: "",
    user: {}
  };

  handleSubmit = newUser => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
  };

  handleConfirm = (type, user) => {
    switch (type) {
      case modal_type.ALL:
        return this.setState({ modal: type });
      case modal_type.USER:
        return this.setState({ modal: type, user });
      default:
        return;
    }
  };

  handleRemove = (type, timestamp) => {
    switch (type) {
      case modal_type.ALL:
        return this.setState({ users: [], modal: "" });
      case modal_type.USER:
        return this.setState(prevState => ({
          users: prevState.users.filter(user => user.timestamp !== timestamp),
          modal: "",
          user: {}
        }));
      default:
        return null;
    }
  };

  handleClose = () => this.setState({ modal: "", user: {} });

  render() {
    const { users, modal, user } = this.state;

    return (
      <Background>
        <GlobalStyle />
        <Modal open={modal} title="Confirm" onClose={() => this.handleClose()}>
          {modal === modal_type.ALL &&
            "Are you sure, that you want to remove all users?"}
          {modal === modal_type.USER &&
            `Are you sure, that you want to remove user ${user.nickname}?`}
          <Row>
            <Col xs={6} sm={4} offset={{ sm: 1 }}>
              <Button
                type="button"
                onClick={() => this.handleRemove(modal, user.timestamp)}
              >
                Yes
              </Button>
            </Col>
            <Col xs={6} sm={4} offset={{ sm: 2 }}>
              <Button outlined type="button" onClick={() => this.handleClose()}>
                No
              </Button>
            </Col>
          </Row>
        </Modal>
        <Container>
          <H1>Crypto Users</H1>
          <AddForm users={users} onSubmit={e => this.handleSubmit(e)} />
          <UserTable
            users={users}
            onRemove={user => this.handleConfirm(modal_type.USER, user)}
            onRemoveAll={() => this.handleConfirm(modal_type.ALL)}
          />
        </Container>
      </Background>
    );
  }
}

export default App;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  background-color: ${color.snow};
`;
