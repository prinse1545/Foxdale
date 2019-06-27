// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: home/index.js
// Description: The home page made for foxdale blog and testimonial
// mangement.
import React, { Component } from 'react'
import { Row, Col, List, Typography, Modal, Input, Button, Skeleton, Form, Popconfirm } from 'antd';
import ListHeader from '../../components/listHeader';
import PanelButton from '../../components/panelButton';
import { connect } from 'react-redux';
//Importing redux actions
import { getTestimonies, insertTestimony, deleteTestimony, toggleTestimony } from '../../actions/testimonies';
import { loadBlogs, addBlogPost, deleteBlogPost, toggleBlog } from '../../actions/blogs';
import { logoutWithFirebase } from '../../actions/auth';

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
  },
  author: {
    fontFamily: 'Avenir',
    fontSize: 16
  },
  col: {
    paddingBottom: 200
  },
  logout: {
    marginLeft: '50%',
    size: 26,
    color: '#fff',
    borderColor: '#FF7F00',
    borderWidth: 3,
    backgroundColor: 'transparent'
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
      body: null,
      author: null
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
    e.preventDefault()

    const { subType, subText } = this.state;


    this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values)


            switch(subType) {
              case 'test':
                this.props.insertTestimony({body: values.body, author: values.author});
                break;
              case 'blog':
                this.props.addBlogPost(values.body);
            }

            this.props.form.resetFields()

            this.setState({
              visible: false,
            });
        }
    })

  };

  onClick(id) {

    console.log(id)
    this.props.deleteTestimony(id)

  }

  onConfirm = () => {
    this.props.logoutWithFirebase()
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
    const {
        getFieldDecorator,
        getFieldError,
        isFieldTouched
    } = this.props.form

    const bodyError =
        isFieldTouched('body') && getFieldError('body')
    const authorError =
        isFieldTouched('author') && getFieldError('author')


    const { visible, modalTitle, placeholder, subType } = this.state;
    const { blogPosts, testimonies, testimonyLoading, blogLoading, deleteBlogPost, deleteTestimony } = this.props;

    const text = 'Are you sure you would like to logout?'

    return (
      <div style={styles.container}>
          <Row type="flex" align="middle" style={styles.logoContainer}>
            <img src='https://foxdale.s3.amazonaws.com/media/fox_head.png' style={styles.logo} />
            <Typography style={styles.title}>
              Foxdale Blog & Testimony Management
            </Typography>
            <Popconfirm placement="right" title={text} onConfirm={this.onConfirm} okText="Yes" cancelText="No">
              <Button type="primary" shape="circle" icon="logout" style={styles.logout} />
            </Popconfirm>
          </Row>
          <Row type="flex" style={styles.row}>
            <Col span={12} style={styles.col}>
              <List
                header={<ListHeader header="Testimonies" onClick={this.showTestModal}/>}
                bordered
                dataSource={testimonies}
                renderItem={item => (
                  <List.Item actions={[<PanelButton text="Are you sure you wish to delete this testimony?" onClick={() => this.onClick(item._id)}/>]}>
                    <Skeleton loading={testimonyLoading}>
                      <List.Item.Meta
                        title={<Typography style={styles.content}>{item.testimony}</Typography>}
                        description={<Typography style={styles.author}>― {item.author}</Typography>}
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
                renderItem={item => (
                  <List.Item actions={[<PanelButton text="Are you sure you wish to delete this blog?" onClick={() => deleteBlogPost(item._id)}/>]}>
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
            footer={[]}
          >
            <Form onSubmit={this.handleOk}>
              <Form.Item>
              {getFieldDecorator('body', {
                  rules: [
                      {
                          required: true,
                          message: 'Please input some text'
                      }
                  ]
              })(
                <Input.TextArea
                  placeholder={placeholder}
                  rows={4}
                />
              )}
              </Form.Item>
              {
                subType == 'test' &&
                <Form.Item>
                {getFieldDecorator('author', {
                    rules: [
                        {
                            required: true,
                            message: 'Please enter the author\'s name'
                        }
                    ]
                })(
                  <Input
                    placeholder={"Enter an author\'s name"}
                  />
                )}
                </Form.Item>
              }
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
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
  toggleTestimony: () => dispatch(toggleTestimony()),
  logoutWithFirebase: () => dispatch(logoutWithFirebase()),
});

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Form.create({ name: "ConnectedHome" })(ConnectedHome);
