import React, { Component } from 'react';
import Navigation from './Navigation';
import Feed from './Feed';
import Header from './Header';

import firebase from './firebase';
import axios from 'axios';

import './App.css';
import './setup.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      keywords: [],
      articles: [],
      flatArray: [],
      addQuery: ''
    }
  }

    // ✅ when passed a unique id, it will try to delete the keyword from the database
  removeKeyword = (queryId) => {
    // make sure to pass the path to the variable (ie: /keywords)
    const dbRef = firebase.database().ref(`/keywords/${queryId}`);
    dbRef.remove();
  }
  
  // ✅ deals with any input box changes
  handleChange = (event) => {
    // when the user types into a checkbox, a state variable with the same name as the checkbox will be updated
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // when the 'add query' button is pressed
  handleSubmit = (e)=> {
    // don't refresh the page
    e.preventDefault();
    // check if it's empty, ignore the submit if it is
    if(this.state.addQuery !== "") {
      const dbRef = firebase.database().ref('keywords');
      dbRef.push(this.state.addQuery);
      this.setState({
        addQuery:'',
      });
    }
    e.val('')
  }

  // ✅ Used for pulling search queries the user supplied
  pullKeywords = () => {
    // Request a list of keywords to be searched (from Firebase)
    // connect to firebase and pull the user supplied search terms
    const dbRef = firebase.database().ref('keywords');
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({
          key: key,
          keyword: data[key]
        })
      };

      // set state.keywords to the retrieved values
      this.setState({
        keywords: newState
      });
    });
  }
  
  // ✅ Fires after the component mounts, main logic starts out here
  componentDidMount() {
    // pull a list of keywords from firebase
    // - these will be used to search news articles later on
    this.pullKeywords();
  }

  // usually called after state is updated
  componentDidUpdate(prevProps, prevState) {
    // make sure to only update the list if a keyword has been added or removed
    if(prevState.keywords !== this.state.keywords) {
      this.updateFeed();
    }
  }

  // Called after a change is made to state, updates the search results to reflect the new or changed search terms
  updateFeed = () => {
    // clear the articles and flatArray states
    this.setState({
      articles: [],
      flatArray: []
    })

    // define a temporary variable of objects to hold the returned articles
    let myArticles = [];
    // for each keyword the user wants to track

    this.state.keywords.forEach((item) => {
      // run a search for each keyword, and return no more than 'X' results
      myArticles.push(
        this.pullArticles(item.keyword, 2)
      )
    })
    this.setState({
      flatArray: myArticles
    })
  }

  // given: a term to search, and the maximum number of results to return
  // it will return a flattened array of article objects
  pullArticles = (searchQuery, maxArticles) => {
    // token one 1d3f655db940ffcce9c38477bfc3043d
    // token two 4f12db3888cd831e2d6a8ad29b618082
    axios.get('https://gnews.io/api/v2/', {
      params: {
        q: searchQuery,
        token: '1d3f655db940ffcce9c38477bfc3043d',
        max: maxArticles,
        in: "title"
      }
    })
      .then((res) => {
        // take a copy of the current list of articles (in state)
        let currentState = this.state.articles;
        // the returned articles from the recent api call
        let returnedArticles = res.data.articles;
        
        // take the recently returned articles and push them to the current state
        currentState.push(returnedArticles)

        // since the currentState array is deeply nested, we need to flatten it
        const flatArray = currentState.reduce((acc, curr) => {
          return acc.concat(curr)
        });

        // finally, we set the newly flattened array to state
        this.setState({
          flatArray: flatArray
        });
      });
  }

  // ✅ Main rendering logic goes here
  render() {
    return (
      <div className="App">
        {/* Skip link */}
        <a href="#maincontent" className="skip-link">Skip to main content.</a>

        <Header
         addQuery    = {this.handleSubmit}
         inputChange={this.handleChange}  
        />

        <Navigation 
          searchTerms = {this.state.keywords}
          removeQuery = {this.removeKeyword}
        />
        <Feed articles={this.state.flatArray} />
      </div>
    );
  }
}

export default App;