import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../../BooksAPI';

export default class SearchPage extends Component {
  state = {
    query: '',
  };

  handleChange = async e => {
    try {
      const query = e.target.value;
      this.setState({ query });
      const results = await search(query);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}
