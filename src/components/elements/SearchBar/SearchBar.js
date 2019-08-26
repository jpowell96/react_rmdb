import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        value: "",
        timeout: null
    }

    doSearch = (event) => {
        /* 
            We don't want to search on every single keystroke
            so we're going to set a time out so it will only
            search after a certain amount of time. 
        */
        this.setState({
            value : event.target.value
        });
        clearTimeout(this.timeout);
        /* 
            In our setTimeout method we're going to use the callback function passed
            to us in props. This is the function that makes a fetch request to the movie
            database api. 

            So there will be 500 milliseconds before the search request will fire
        */
        setTimeout(() => {
            this.props.callback(this.state.value);
        }, 500);
    }

    render() {
        return (
        <div className="rmdb-searchbar">
            <div className="rmdb-searchbar-content">
                <FontAwesome className="rmdb-fa-search" name="search" size="2x"/>
                <input type="text" 
                className="rmdb-searchbar-content"
                placeholder="Search"
                onChange={this.doSearch}
                value={this.state.value}
                ></input>
            </div>
        </div>);
    }
}

export default SearchBar;