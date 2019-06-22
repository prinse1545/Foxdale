// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: listHeader/index.js
// Description: a header component to be used for the lists
// displaying the current testimonies and blog posts which
// will allow for the addition of testimonies and blog posts
import React, { Component } from 'react';
import { Col, Row, Icon, Typography, Button } from 'antd';

const styles = {
  button: {
    color: '#fff',
    backgroundColor: '#ffae19',
    borderColor: '#ffae19'
  },
  container: {
    backgroundColor: '#fff'
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 22,
    color: '#ffae19'
  }
}

export default class ListHeader extends Component {

  render() {
    const { header, onClick } = this.props
    return(
      <div style={styles.container}>
        <Row>
          <Col span={18}>
            <Typography style={styles.text}>{header}</Typography>
          </Col>
          <Col span={6} type="flex" align="end">
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              onClick={onClick}
              size="default"
              style={styles.button} />
          </Col>
        </Row>
      </div>
    );
  }
};
