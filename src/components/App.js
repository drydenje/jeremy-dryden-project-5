import React, { Component } from 'react';
// import Navigation from './Navigation';
// import AddQuery from './AddQuery';
import Feed from './Feed';
import Header from './Header';

import firebase from './firebase';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      keywords: [],
      userInput: '',
      articles: []
    }
  }

  pullArticles = (searchQuery, maxArticles) => {
    axios.get('https://gnews.io/api/v2/', {
      params: {
        q: searchQuery,
        token: '4f12db3888cd831e2d6a8ad29b618082',
        max: maxArticles,
        in: "title"
      }
    })
    .then((res) => {
      // let [...temp] = [this.state.articles];
      
      let currentState = this.state.articles;
      console.log(currentState);

      let returnedArticles = res.data.articles;
      console.log(returnedArticles)

      currentState.push(returnedArticles)
      console.log(currentState)

      const flatArray = currentState.reduce( (acc,curr) =>{
        return acc.concat(curr)
      })
      console.log(flatArray)
      // temp.forEach((article) => {
      //   if(article != undefined) {
      //     temp.push(article);
      //     console.log(article);
      //   }
      // })
      this.setState({
        flatArray: flatArray
      });
    })
  }


  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // removeKeyword = (keyword) => {
  //   const dbRef = firebase.database().ref(keyword);
  //   dbRef.remove();
  // }

  // handleSubmit = (e)=> {
    // e.preventDefault();
    // const dbRef = firebase.database().ref('keyword');
    // dbRef.push(this.state.userInput);
    // this.setState({
    //   userInput:''
    // });
  // }

  componentDidMount() {
    const dbRef = firebase.database().ref('keywords');
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();
      for(let key in data) {
        newState.push({
          key: key,
          keyword: data[key]
        })
      };
      this.setState({
        keywords: newState
      })
      // console.log("keyword array:", this.state.keywords)

      // let myArticles = this.state.articles;
      let myArticles = [];

      // console.log("App Articles", myArticles);
      // for each keyword the user wants to track
      this.state.keywords.forEach((item) => {
        // run a search for each keyword, and return no more than 2 results
            myArticles.push(
              this.pullArticles(item.keyword, 2)
            )
        // console.log(this.pullArticles(item.keyword, 2));
        // console.log(item.keyword);
      })
      // this.setState({
      //   articles: myArticles
      // });
      // console.log("App Articles", myArticles);
    });

    // this.pullArticles("iPhone", 2);

    // Adding in dummy data
    // const dbRef = firebase.database().ref('keywords');
    // dbRef.push("Microsoft");
    // dbRef.push("Nike");
    // dbRef.push("Apple");
  }

  render() {
    return (
      <div className="App">
        {/* <Navigation searchTerms={this.state.keywords}/> */}
        <Header/>
        {/* <AddQuery 
          handleSubmit={this.handleSubmit}
          userInput={this.state.userInput}
        /> */}
        <Feed articles={this.state.articles}/>
      </div>
    );
  }
}

export default App;