import React, { Component } from 'react';

import { Row, Col, Typography, Button } from 'antd';

const styles = {
  text: {
    fontFamily: 'Avenir',
    fontSize: 18
  },
  button: {
    color: '#fff',
    backgroundColor: 'red',
    borderColor: 'red'
  }
}


export default class ListPanel extends Component {
  render() {
    const { text, onClick } = this.props;
    return(
      <Row>
        <Col span={20}>
          <Typography style={styles.text}>{text}</Typography>
        </Col>
        <Col span={4} type="flex" align="end">
          <Button
            type="primary"
            shape="circle"
            icon="close"
            onClick={onClick}
            size="small"
            style={styles.button} />
        </Col>
      </Row>
    );
  }
};
