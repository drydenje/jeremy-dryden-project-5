import React, { Component } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Feed from "../Feed/Feed";
import Header from "../../components/Header/Header";

import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../../components/firebase.js";

// import axios from "axios";
// import qs from "qs";

import "./App.css";
import "./setup.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      keywords: [],
      articles: [],
      addQuery: "",
    };
  }

  // ✅ when passed a unique id, it will try to delete the keyword from the database
  // removeKeyword = (queryId) => {
  //   // make sure to pass the path to the variable (ie: /keywords)
  //   const dbRef = firebase.database().ref(`/keywords/${queryId}`);
  //   dbRef.remove();
  // };

  // ✅ deals with any input box changes
  handleChange = (event) => {
    // when the user types into a checkbox, a state variable with the same name as the checkbox will be updated
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // when the 'add query' button is pressed
  handleSubmit = (e) => {
    // don't refresh the page
    e.preventDefault();
    // check if it's empty, ignore the submit if it is
    if (this.state.addQuery !== "") {
      const dbRef = ref("keywords");
      dbRef.push(this.state.addQuery);
      this.setState({
        addQuery: "",
      });
    }
    e.target.reset();
  };

  // ✅ Used for pulling search queries the user supplied
  pullKeywords = () => {
    // Request a list of keywords to be searched (from Firebase)
    // connect to firebase and pull the user supplied search terms

    // const dbRef = firebase.database().ref("keywords");
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // dbRef.on("value", (response) => {
    onValue(
      dbRef,
      (response) => {
        // const newState = [];
        const data = response.val();
        // console.log(data.keywords);
        // for (let key in data) {
        //   console.log("Key:", key);
        //   // newState.push({
        //   //   key: key,
        //   //   keyword: data[key],
        //   // });
        // }

        // set state.keywords to the retrieved values
        // console.log("NewState Final:", newState);
        this.setState({
          keywords: data.keywords,
        });
      },
      []
    );
  };

  // ✅ Fires after the component mounts, main logic starts out here
  componentDidMount() {
    // pull a list of keywords from firebase
    // - these will be used to search news articles later on
    // this.pullKeywords();
  }

  // usually called after state is updated
  componentDidUpdate(prevProps, prevState) {
    // make sure to only update the list if a keyword has been added or removed
    if (prevState.keywords !== this.state.keywords) {
      // this.updateFeed();
    }
  }

  // Called after a change is made to state, updates the search results to reflect the new or changed search terms
  updateFeed = () => {
    // clear the articles and flatArray states
    this.setState({
      articles: [],
      flatArray: [],
    });

    // define a temporary variable of objects to hold the returned articles
    let myArticles = [];
    // for each keyword the user wants to track

    this.state.keywords.forEach((item) => {
      // run a search for each keyword, and return no more than 'X' results
      myArticles.push(this.pullArticles(item.keyword, 2));
    });
    this.setState({
      flatArray: myArticles,
    });
  };

  // given: a term to search, and the maximum number of results to return
  // it will return a flattened array of article objects
  pullArticles = (searchQuery, maxArticles) => {
    console.log(searchQuery);
    const term = "airpods";
    // const fetchUrl2 ="https://gnews.io/api/v4/search?q=example&token=4f12db3888cd831e2d6a8ad29b618082";
    const fetchUrl = `https://gnews.io/api/v4/search?q=${term}&max=${maxArticles}&token=${process.env.REACT_APP_GKEY}`;

    fetch(fetchUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.articles);
      });

    // axios
    //   .get("https://pacific-eyrie-44772.herokuapp.com/", {
    //     dataResponse: "json",
    //     paramsSerializer: function (params) {
    //       return qs.stringify(params, { arrayFormat: "brackets" });
    //     },
    //     params: {
    //       reqUrl: "https://gnews.io/api/v4/",
    //       params: {
    //         q: searchQuery,
    //         token: process.env.REACT_APP_GKEY,
    //         max: maxArticles,
    //         in: "title",
    //       },
    //       xmlToJSON: false,
    //       // useCache: false,
    //     },
    //   })

    // // take a copy of the current list of articles (in state)
    // let currentState = this.state.articles;
    // // the returned articles from the recent api call
    // let returnedArticles = res.data.articles;

    // // take the recently returned articles and push them to the current state
    // currentState.push(returnedArticles);

    // // since the currentState array is deeply nested, we need to flatten it
    // const flatArray = currentState.reduce((acc, curr) => {
    //   return acc.concat(curr);
    // });

    // // finally, we set the newly flattened array to state
    // this.setState({
    //   flatArray: flatArray,
    // });
  };

  // ✅ Main rendering logic goes here
  render() {
    return (
      <div className="App">
        {/* Skip link */}
        <a href="#maincontent" className="skip-link">
          Skip to main content.
        </a>

        <Header addQuery={this.handleSubmit} inputChange={this.handleChange} />

        <Navigation />
        <Feed />
      </div>
    );
  }
}

export default App;
