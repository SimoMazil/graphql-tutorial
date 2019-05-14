import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: null,
    genre: null,
    authorId: null
  }
  
  displayAuthors() {
    const {loading, authors} = this.props.getAuthorsQuery;

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

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId 
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  render() {
    return (
      <form id='add-book' onSubmit={this.onSubmit}>

        <div className='field'>
          <label>Book Name</label>
          <input type='text' onChange={(e) => this.setState({name: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Book Genre</label>
          <input type='text' onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Author</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
