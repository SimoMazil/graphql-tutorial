import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: null,
    genre: null,
    authorId: null
  }
  
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

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
          <input type='text' onChange={(e) => this.setState({name: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Author</label>
          <select onChange={(e) => this.setState({name: e.target.value})}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
