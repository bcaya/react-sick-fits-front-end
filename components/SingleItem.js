import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query} from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs}
  display: grid;
  grid-auto-column: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const SINGLE_ITEM_QUERY = gql `
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query 
        query={SINGLE_ITEM_QUERY}
        variables={{id: this.props.id,}}
      >
        {({error, loading, data}) => {
          if(error) return <Error error={error} />
          if(loading) return<p>Loading...</p>
          if(!data.item) return <p>No Item Found for {this.props.id}</p>
        return (
          <SingleItemStyles>
            <Head>
              <title>Sick Fits | {data.item.title}</title>
            </Head>
          <img src={data.item.largeImage} alt={data.item.title}/>
          <div className="details">
            <h2>Viewing {data.item.title}</h2>
            <p>{data.item.description}</p>
          </div>
        </SingleItemStyles>)
      }}
      </Query>
    )
  }
}

export default  SingleItem;
export { SINGLE_ITEM_QUERY };