// import React from "react";
import {
  BrowserRouter as Router,
  Routes, // Switch or Routes?
  Route,
  // Navigate, // used to be Redirect
  // useParams,
} from "react-router-dom";

import Feed from "containers/Feed";
import Header from "containers/Header";

import "./App.css";
import "./setup.css";

const App = () => {
  // ✅ Main rendering logic goes here
  return (
    <Router>
      <div className="App">
        {/* Skip link */}
        {/* <a href="#maincontent" className="skip-link">
          Skip to main content.
        </a> */}
        {/* <Navigation /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          {/* <Route path="/" element={<Instructions />}>
          <Route path=":q" element={<Feed />} />
          </Route> */}
          <Route
            path="*"
            element={
              <main>
                <h2>Invalid Url</h2>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// useEffect(() => {
//   console.log(searchParams.getAll("q"));
//   const currentParams = Object.fromEntries([...searchParams]);
//   // console.log("q:", currentParams["q"]);
//   // check if a query has been provided
//   // might have this check moved to the reducer?
//   if (currentParams["q"]) {
//     dispatch(
//       addArticles({
//         id: nanoid(),
//         keyword: currentParams["q"],
//       })
//     );
//   }
// }, [searchParams]);

// // ✅ Used for pulling search queries the user supplied
// pullKeywords = () => {
//   // Request a list of keywords to be searched (from Firebase)
//   // connect to firebase and pull the user supplied search terms

//   // const dbRef = firebase.database().ref("keywords");
//   const database = getDatabase(firebase);
//   const dbRef = ref(database);

//   // dbRef.on("value", (response) => {
//   onValue(
//     dbRef,
//     (response) => {
//       // const newState = [];
//       const data = response.val();
//       // console.log(data.keywords);
//       // for (let key in data) {
//       //   console.log("Key:", key);
//       //   // newState.push({
//       //   //   key: key,
//       //   //   keyword: data[key],
//       //   // });
//       // }

//       // set state.keywords to the retrieved values
//       // console.log("NewState Final:", newState);
//       this.setState({
//         keywords: data.keywords,
//       });
//     },
//     []
//   );
// };

// // usually called after state is updated
// componentDidUpdate(prevProps, prevState) {
//   // make sure to only update the list if a keyword has been added or removed
//   if (prevState.keywords !== this.state.keywords) {
//     // this.updateFeed();
//   }
// }

// // given: a term to search, and the maximum number of results to return
// // it will return a flattened array of article objects
// pullArticles = (searchQuery, maxArticles) => {
//   console.log(searchQuery);
//   const term = "airpods";
//   // const fetchUrl2 ="https://gnews.io/api/v4/search?q=example&token=4f12db3888cd831e2d6a8ad29b618082";
//   const fetchUrl = `https://gnews.io/api/v4/search?q=${term}&max=${maxArticles}&token=${process.env.REACT_APP_GKEY}`;

//   fetch(fetchUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data.articles);
//     });

//   // axios
//   //   .get("https://pacific-eyrie-44772.herokuapp.com/", {
//   //     dataResponse: "json",
//   //     paramsSerializer: function (params) {
//   //       return qs.stringify(params, { arrayFormat: "brackets" });
//   //     },
//   //     params: {
//   //       reqUrl: "https://gnews.io/api/v4/",
//   //       params: {
//   //         q: searchQuery,
//   //         token: process.env.REACT_APP_GKEY,
//   //         max: maxArticles,
//   //         in: "title",
//   //       },
//   //       xmlToJSON: false,
//   //       // useCache: false,
//   //     },
//   //   })
