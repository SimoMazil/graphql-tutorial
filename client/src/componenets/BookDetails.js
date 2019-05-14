import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookDetailsQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data

    if(book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this author</p>
          <ul>
            {
              book.author.books.map(item => {
                return <li key={item.id}>{item.name}</li>
              })
            }
          </ul>
        </div>
      )
    } else {
      return (
        <p>No book selected.</p>
      )
    }
  }

  render() {
    return (
      <div id="book-details">
        <p>Output book details here</p>
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);