import React, { Component } from 'react'
import {Row, Card, CardHeader,CardBody,CardTitle, Col, CardText} from 'reactstrap'
import axios from 'axios'

class Github extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    axios.get(`http://localhost:5050/github/newusers`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }
  render() {
    return (
      <>
        <Row>  
          {this.state.users.map((user, index) => {
          return(
            <Col md="4">
              <Card body outline color="danger">
                <CardHeader>
                  <CardTitle tag="p" key={index}>{user.id}</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>Username: {user.login}</CardText>
                </CardBody>
              </Card>
            </Col>
            )})
          }
        </Row>  
      </>
    )
  }
}
export default Github