import React from 'react';

const AddQuery = (props) => {
   console.log("AddQuery props", props);
   return (
      <form action="submit">
         <input type="text"
            placeholder="Add a query to watch for"
         />
         <button>Add Query</button>
      </form>
   )
}

export default AddQuery;