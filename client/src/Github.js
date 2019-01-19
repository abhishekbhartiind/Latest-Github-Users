import React, { Component } from 'react'
import {Row, Card, CardSubtitle,CardBody,CardTitle, Col, CardImg} from 'reactstrap'
import axios from 'axios'
var cardStyle = {
  padding: '20px'
}

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
        <div>
          <h1>Github 100 recent Users list</h1>
        </div>
        <Row>  
          {this.state.users.map((user, index) => {
          return(
            <Col md="4" style={cardStyle}>
              <Card>
              <CardImg top src={user.avatar_url} alt="..." />
                <CardBody>
                 <CardTitle tag="p" key={index}>Username: <b>{user.login}</b></CardTitle>
                 <CardSubtitle>Id: {user.id}</CardSubtitle>
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