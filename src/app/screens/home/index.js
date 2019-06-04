// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: home/index.js
// Description: The home page made for foxdale blog and testimonial
// mangement.
import React, { Component } from 'react'
import { Row, Col, List, Typography, Modal } from 'antd';
import ListHeader from '../../components/listHeader';

const styles = {
  container: {
    backgroundColor: '#ffae19',
    height: 960,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  list: {
    paddingBottom: '30%'
  },
  logoContainer: {
    paddingTop: '3%',
    marginBottom: '3%'
  }
}

export default class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      modalTitle: null
    }
  }

  showTestModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Add Testimony"
    });
  };

  showBlogModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Add Blog Post"
    });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, modalTitle } = this.state;
    return (
      <div style={styles.container}>
          <Row type="flex" align="center" style={styles.logoContainer}>
            <img src='https://foxdale.s3.amazonaws.com/media/fox_head.png' />
          </Row>
          <Row type="flex" style={styles.row}>
            <Col span={12}>
              <List
                header={<ListHeader header="Testimonies" onClick={this.showTestModal}/>}
                bordered
                style={styles.list}
                renderItem={item => (
                  <List.Item>
                    <h1>hi</h1>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <List
                header={<ListHeader header="Blog Posts" onClick={this.showBlogModal}/>}
                bordered
                style={styles.list}
                renderItem={item => (
                  <List.Item>
                    <h1>hi</h1>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Modal
            title={modalTitle}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
      </div>
    );
  }
};
