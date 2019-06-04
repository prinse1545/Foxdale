import React, { Component } from 'react'
import { Row, Col, List } from 'antd';


export default class Home extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row type="flex" style={{flexDirection: 'row'}}>
          <Col span={12}>
            <List
              header={<div>Testimonies</div>}
              bordered
              renderItem={item => (
                <List.Item>
                  <h1>hi</h1>
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <List
              header={<div>Blog Posts</div>}
              bordered
              renderItem={item => (
                <List.Item>
                  <h1>hi</h1>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
};
