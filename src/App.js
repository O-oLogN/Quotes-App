import './App.css';
import {useState} from 'react';


function App() {
  let [state, setNewState] = useState({quote: "Let's start", author: "Me", color: "green"});
    
  const handleClick = () => {
    async function getNewQuote() {
      const res = await fetch('https://dummyjson.com/quotes/random')
      const newState = await res.json();
      setNewState({
        quote: newState.quote,
        author: newState.author,
        color: `rgba(${Math.floor(Math.random() * 155)},
                     ${Math.floor(Math.random() * 155)},
                     ${Math.floor(Math.random() * 155)}, 0.5)`
      });
    }
    getNewQuote();
  }
  
  return (
    <div id="quote-container" style={{backgroundColor: state.color}}>
      <div id="wrapper">
        <div id="quote-box">
          <Quote id="quote" color={state.color} text={state.quote}>
          </Quote>
          <Author id="author" color={state.color} text={state.author}>
          </Author>
          <FunctionalButtons id="functional-buttons-container" onNewQuoteButtonClick={handleClick} color={state.color}>
          </FunctionalButtons>
        </div>
        <div id="footer">
            by ologn 
        </div>
      </div>
    </div>
  );
}

function Quote(props) {
  return (
    <div id={props.id}>
      <i className="fa fa-quote-left" id="quote-left-icon" style={{color: props.color}} />
      <span style={{color: props.color}}>
          {props.text} 
      </span>                         
    </div>  
  );
}

function Author(props) {
  return (
    <div id={props.id} style={{color: props.color}}> 
        - {props.text}       
    </div>  
  );
}

function FunctionalButtons(props) {
  return (
    <div id={props.id} className="row">
      <TweetShare id="tweet-quote" color={props.color}>
      </TweetShare>
      <NewQuote id="new-quote" onNewQuoteButtonClick={props.onNewQuoteButtonClick} color={props.color}>
      </NewQuote>
    </div>
  );
}

function TweetShare(props) {
  return (
    <a href="https://twitter.com/intent/tweet/" target="_blank">
      <button id={props.id} className="btn" style={{backgroundColor: props.color}}>
        <i className="bi bi-twitter" id="twitter-icon" />
      </button>
    </a>
  );
}

function NewQuote(props) {
  return (
    <button id={props.id} className="btn" onClick={props.onNewQuoteButtonClick} style={{backgroundColor: props.color}}>
      New quote
    </button>
  );
}


export default App;
