/**
 * App.js 
 * - The main app component
 * - A container of all major components
 */



// Load react and components from `node_modules`
import React, { useState, useEffect } from 'react';

// import custom stylesheet
import './contact.css';



/** 
 * App Component 
 */
const App = () => {

  // in a real application, data is acquired as a result of an API call, ...
  // ... data usually in the form of an array of data objects
  // so this data is only a placeholder until the real API call
  // const data = [
  //   { name: "Jenny Han", email: "jenny.han@notreal.com", age: 25 },
  //   { name: "Jason Long", email: "jason.long@notreal.com", age: 45 },
  //   { name: "Peter Pan", email: "peter.pan@neverland.com", age: 100 }
  // ];

  // notes on `useState` and relevant details -
  //
  // a state in React is good for holding data that can change
  // ... so our `contacts` list is a good candidate for this
  //
  // `useState` takes in an initial value and returns
  // ... 1. reference to state value 
  // ... 2. function to allow changing the state
  //
  // `const [elem1, elem2] = anArray` is an example of destructuring an array
  // ... so once the array is returned, it is destructured
  // ... and the two returning items are accesible through
  // ... `contacts` and `setContacts` in this case
  // 
  // also note that this state only represents one instance of the component
  // ... so if there are 3 instances, i.e. 3 cards, each card will have it's own state representation
  const [contacts, setContacts] = useState([]);
  
  // note on coding conventions -
  // 
  // please note that the const variable has not been made uppercase,
  // ... as this is only used internally here, and AirBnB guidelines state 
  // ... that only exported variables that are const should be made uppercase

  // It's also important to note that in React, once the state changes, 
  // ... the view is re-rendered automatically. 
  // ... without the `useEffect` hook the view would be re-rendered continuously in a loop
  // ... every time it is re-rendered, the API call is made again, ...
  // ... which returns a different set of use objects from the API call
  // ... which causes the state to change again, followed by a re-render etc

  // `Fetch` used to call randomuser.me API and retrieve random user details
  // fetch("https://randomuser.me/api/?results=3")
  //   .then(response => response.json())
  //   .then(data => setContacts(data.results));

  // notes on `useEffect` -
  //
  // Please note just like componentDidMount in class based react components
  // ... useEffect can be used in a similar fashion to execute code
  // ... API call in this case, once the component is mounted.
  //
  // `[]` as the second parameter ensures that the code is only executed once
  // ... on mount and not everytime the component is rendered
  //
  // in essence, by using the useEffect hook ...
  // ... you tell react that your component needs to do something
  // ... after rendering
  //
  // also, react lifecycle methods ...
  // ... like componentDidMount are not available to functional components
  // ... lifecycle methods are only available to class components
  

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=3")
    .then(response => response.json())
    .then(data => {

      // uncomment to see data set in console
      // console.log(data.results);
      setContacts(data.results);
    });
  }, []);


  // The contents of this return statement, 
  // rendered as HTML and populated in index.html root element
  return (

    // Please note that the empty brackets are React.Fragments
    // They are not a part of the rendered HTML
    // But are necessary here, since components expect a SINGLE component return ...
    // ... and a list of components go against that principle!
    <>
      {
        // regular function //////////
        // contacts.map(function (contact) {
        //   return <ContactCard
        //     avatar="https://via.placeholder.com/150"
        //     name={contact.name}
        //     email={contact.email}
        //     age={contact.age}
        //   />
        // })

        // arrow function expression, braces need explicit return //////////
        // contacts.map(contact => {
        //   return <ContactCard
        //     avatar="https://via.placeholder.com/150"
        //     name={contact.name}
        //     email={contact.email}
        //     age={contact.age}
        //   />
        // })

        // arrow function expression, paranthesis implicit return //////////
        contacts.map(contact => (
          <ContactCard
            avatar={contact.picture.large}
            name={contact.name.first + ' ' + contact.name.last}
            email={contact.email}
            age={contact.dob.age}
          />
        ))
      }

      <div className="right-align fade-in">
        <button className="next-btn" onClick={() => window.location.reload(false)} title="Display next set of cards">Next &gt;&gt;</button>
      </div>
    </>
  )
};



/**
 * Contact Component
 * It exists here just for ease,
 * in the real world, components should ideally be in there own file
 */
const ContactCard = props => {

  // please refer to the `useState` comments above
  const [showAge, setShowAge] = useState(false);

  return (
    // Please note that anything between `<div></div>` is JSX,
    // JavaScript XML, NOT HTML or JavaScript,
    // Therefore, comments work outside of the `<div></div>` segment

    // also note `className` (react) vs `class` (html)
    <div className="contact-card fade-in">
      <img src={props.avatar} alt="profile" />
      <div>
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>

        {
          // here use the 2nd returned value of useState, the `setShowAge` function,
          // to help toggle the current state  
        }
        <button onClick={() => setShowAge(!showAge)}>{!showAge ? 'Show' : 'Hide'} Age</button>

        {
          // within this `<div></div>` segment to use javascript, 
          // like comments, please enclose within `{}`
          // showAge ? <p>Age: 25</p> : false

          // However, please note that it's possible to directly use JSX within JS
          showAge && <p>Age: {props.age}</p>
        }

      </div>
    </div>

    // Comments work here too!
  );
};

export default App;
