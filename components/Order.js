import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import FormatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles'

 class Order extends React.Component {
   static propTypes = {
     id: PropTypes.string.isRequired
   }
  render() {
    return (
      <div>
        <p>Order ID: {this.props.id} </p>
      </div>
    )
  }
}


export default Order;