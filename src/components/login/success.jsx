import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function Success(props) {
    return (
        <h1>登入成功</h1>
    );
}

const mapStateToProps = (state) => {
  return {
    // input: state.songlistReducer.input,
    // list: state.songlistReducer.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
	// login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Success)