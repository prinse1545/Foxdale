// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: home/index.js
// Description: The home page made for foxdale blog and testimonial
// mangement.
import React, { Component } from 'react'
import { Row, Col, List, Typography, Modal, Input, Button, Skeleton } from 'antd';
import ListHeader from '../../components/listHeader';
import PanelButton from '../../components/panelButton';
import { connect } from 'react-redux';

import { getTestimonies, insertTestimony, deleteTestimony, toggleTestimony } from '../../actions/testimonies';
import { loadBlogs, addBlogPost, deleteBlogPost, toggleBlog } from '../../actions/blogs';


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
    paddingBottom: '30%',
  },
  logoContainer: {
    paddingTop: '3%',
    marginBottom: '3%'
  },
  input: {
    height: 30
  },
  listItem: {
    borderColor: '#ffae19',
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 28,
    color: '#fff',
    marginLeft: 30
  },
  logo: {
    marginLeft: 50
  },
  content: {
    fontFamily: 'Avenir',
    fontSize: 22
  }
}

class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      modalTitle: null,
      subType: null,
      placeholder: null,
      subText: null
    }
    //Set as loading for skeleton
    this.props.toggleBlog()
    this.props.toggleTestimony()
    //Loading data
    this.props.getTestimonies()
    this.props.loadBlogs()
    //Set as finished loading for skeleton
    this.props.toggleBlog()
    this.props.toggleTestimony()
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

    const { subType, subText } = this.state;

    switch(subType) {
      case 'test':
        this.props.insertTestimony(subText);
        break;
      case 'blog':
        this.props.addBlogPost(subText);
    }

    this.setState({
      visible: false,
    });
  };

  onClick(id) {



  }

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
    const { blogPosts, testimonies, testimonyLoading, blogLoading } = this.props;

    return (
      <div style={styles.container}>
          <Row type="flex" align="middle" style={styles.logoContainer}>
            <img src='https://foxdale.s3.amazonaws.com/media/fox_head.png' style={styles.logo} />
            <Typography style={styles.title}>
              Foxdale Blog & Testimony Management
            </Typography>
          </Row>
          <Row type="flex" style={styles.row}>
            <Col span={12}>
              <List
                header={<ListHeader header="Testimonies" onClick={this.showTestModal}/>}
                bordered
                dataSource={testimonies}
                style={styles.list}
                renderItem={item => (
                  <List.Item actions={[<PanelButton text="Are you sure you wish to delete this testimony?"/>]}>
                    <Skeleton loading={testimonyLoading}>
                      <List.Item.Meta
                        title={<Typography style={styles.content}>{item.testimony}</Typography>}
                      />
                    </Skeleton>
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
                  <List.Item actions={[<PanelButton text="Are you sure you wish to delete this blog?"/>]}>
                    <Skeleton loading={blogLoading}>
                      <List.Item.Meta
                        title={<Typography style={styles.content}>{item.text}</Typography>}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Modal
            title={modalTitle}
            visible={visible}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Submit
              </Button>,
            ]}
          >
          <Input.TextArea
            placeholder={placeholder}
            rows={4}
            onChange={(text) => console.log(text)}
          />
          </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    testimonies: state.testimonies.testimonies,
    blogPosts: state.blogs.blogPosts,
    testimonyLoading: state.testimonies.testimonyLoading,
    blogLoading: state.blogs.blogLoading
  }
};

const mapDispatchToProps = dispatch => ({
  getTestimonies: () => dispatch(getTestimonies()),
  loadBlogs: () => dispatch(loadBlogs()),
  insertTestimony: (testimony) => dispatch(insertTestimony(testimony)),
  addBlogPost: (blogPost) => dispatch(addBlogPost(blogPost)),
  deleteTestimony: (testId) => dispatch(deleteTestimony(testId)),
  deleteBlogPost: (blogId) => dispatch(deleteBlogPost(blogId)),
  toggleBlog: () => dispatch(toggleBlog()),
  toggleTestimony: () => dispatch(toggleTestimony())
});

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
