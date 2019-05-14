import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import BookDetails from './BookDetails'

import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
  state = {
    bookId: null
  }

  displayBooks() {
    const {loading, books} = this.props.data;

    if(loading) {
      return (
        <div>Loading Books...</div>
      )
    } else {
      return books.map(book => {
        return (
          <li key={book.id} onClick={(e) => {this.setState({bookId: book.id})}}>{book.name}</li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.bookId}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
