import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
  displayAuthors() {
    const {loading, authors} = this.props.data;

    if(loading) {
      return (
        <option>Loading Authors...</option>
      )
    } else {
      return authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }

  render() {
    return (
      <form id='add-book'>

        <div className='field'>
          <label>Book Name</label>
          <input type='text'/>
        </div>

        <div className='field'>
          <label>Book Genre</label>
          <input type='text'/>
        </div>

        <div className='field'>
          <label>Author</label>
          <select>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
