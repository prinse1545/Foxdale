// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: home/index.js
// Description: The home page made for foxdale blog and testimonial
// mangement.
import React, { Component } from 'react'
import { Row, Col, List, Typography, Modal, Input } from 'antd';
import ListHeader from '../../components/listHeader';
import ListPanel from '../../components/listPanel';
import { connect } from 'react-redux';

import { getTestimonies, insertTestimony, deleteTestimony } from '../../actions/testimonies';
import { loadBlogs, addBlogPost, deleteBlogPost } from '../../actions/blogs';

const { TextArea } = Input;

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
  },
  input: {
    height: 30
  }
}

class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      modalTitle: null,
      subType: null,
      placeholder: null
    }
  }

  componentDidMount = () => {

    this.props.getTestimonies()
    this.props.loadBlogs()
  }

  showTestModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Add Testimony",
      subType: 'test',
      placeholder: 'Enter a new testimony...'
    });
  };

  showBlogModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Add Blog Post",
      subType: 'blog',
      placeholder: 'Enter a new blog post...'
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

  handleChange = e => {
    console.log(e)
  }

  render() {
    const { visible, modalTitle, placeholder } = this.state;
    const { blogPosts, testimonies } = this.props;
    console.log(testimonies)
    console.log(blogPosts)
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
                dataSource={testimonies}
                style={styles.list}
                renderItem={item => (
                  <List.Item>
                    <ListPanel text={item.testimony} />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <List
                header={<ListHeader header="Blog Posts" onClick={this.showBlogModal}/>}
                bordered
                dataSource={blogPosts}
                style={styles.list}
                renderItem={item => (
                  <List.Item style={{width: 400}}>
                    <ListPanel text={item.text} />
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
            <TextArea
              placeholder={placeholder}
              rows={4}
              onChange={this.handleChnage}
            />
          </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    testimonies: state.testimonies.testimonies,
    blogPosts: state.blogs.blogPosts
  }
};

const mapDispatchToProps = dispatch => ({
  getTestimonies: () => dispatch(getTestimonies()),
  loadBlogs: () => dispatch(loadBlogs()),
  insertTestimony: (testimony) => dispatch(insertTestimony(testimony)),
  addBlogPost: (blogPost) => dispatch(addBlogPost(blogPost)),
  deleteTestimony: (testId) => dispatch(deleteTestimony(testId)),
  deleteBlogPost: (blogId) => dispatch(deleteBlogPost(blogId))
});

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
