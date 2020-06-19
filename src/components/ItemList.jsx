import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions/items'

import Item from './Item'
import { Spin } from 'antd'
import '../assets/list.scss'

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData('http://api.tvmaze.com/shows')
  }

  render() {
    if (this.props.hasError) {
      return <p>Sorry! There was an error loading the items</p>
    }

    if (this.props.isLoading) {
      return (
        <div className="item-list">
          <div className="loading">
            <Spin tip="Loading..." size="large" />
          </div>
        </div>
      )
    }

    if (!this.props.isLoading) {
      return (
        <div className="item-list">
          {this.props.items.map((item) => (
            <Item key={item.id} name={item.name} url={item.url} summary={item.summary} image={item.image} rate={item.rating} />
          ))}
        </div>
      );
    }
  }
}

ItemList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
      items: state.items,
      hasError: state.itemsHaveError,
      isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
