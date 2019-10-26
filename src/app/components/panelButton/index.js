// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: panelButton/index.js
// Description: A delete button for the individual testimony and blog panels
// Props:
//
//   text - the text for pop confirm
//   onClick - the method triggered when
//             button is clicked
// +++++++++++++++++++++++++++++++++++++


import React from 'react';
import {
  Popconfirm,
  Button
} from 'antd'

const styles = {
  button: {
    color: '#fff',
    backgroundColor: 'red',
    borderColor: 'red',
    marginTop: 10
  }
}


const PanelButton = (props) => {
  const { text, onClick } = props;
  return (
    <Popconfirm placement="right" title={text} onConfirm={onClick} okText="Yes" cancelText="No">
      <Button
        type="primary"
        shape="circle"
        icon="close"
        size="small"
        style={styles.button} />
    </Popconfirm>
  )
}

export default PanelButton;
