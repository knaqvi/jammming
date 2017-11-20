import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  search(term) {
    this.props.onSearch(term);
  }

  handleTermChange(event) {
    this.search(event.target.value);
  }

  render () {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
          onSearch={this.props.search}
          onChange={this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
