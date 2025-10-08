import { useState } from "react";
import "./App.css";

function Main({ handlePopup }) {
  return (
    <>
      <main className="container">
        {/* <!-- Lanes / subreddit list --> */}
        <div className="lanes">
          <div className="lane">
            <div className="lane-header">
              <h2>/r/learnprogramming</h2>
              <div className="lane-menu">
                <button className="btn refresh">Refresh</button>
                <button className="btn delete">Delete</button>
              </div>
            </div>

            <ul className="posts">
              <li>
                <span className="votes">▲ 431</span> Post title here
              </li>
              <li>
                <span className="votes">▲ 312</span> Another post here
              </li>
              <li>
                <span className="votes">▲ 123</span> Yet another post
              </li>
            </ul>
          </div>

          <div className="lane">
            <div className="lane-header">
              <h2>/r/javascript</h2>
              <div className="lane-menu">
                <button className="btn refresh">Refresh</button>
                <button className="btn delete">Delete</button>
              </div>
            </div>

            <ul className="posts">
              <li>
                <span className="votes">▲ 221</span> ES6 tips and tricks
              </li>
              <li>
                <span className="votes">▲ 112</span> Learn React the easy way
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Add subreddit button --> */}
        <div className="add-lane">
          <button id="addBtn" onClick={handlePopup}>
            ＋
          </button>
        </div>
      </main>
    </>
  );
}

function Popup({ popup, handlePopup, getDataReddit }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setValue("");
    getDataReddit();
    handlePopup();
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  if (!popup) return;
  return (
    <>
      {/* <!-- Popup form --> */}
      <div id="popup" className="popup">
        <form className="popup-content" onSubmit={handleSubmit}>
          <h3>Enter the name of subreddit</h3>
          <input
            type="text"
            id="subredditInput"
            value={value}
            onChange={handleChange}
            placeholder="e.g. javascript"
          />
          <button id="addSubreddit">Add Subreddit</button>
        </form>
      </div>
    </>
  );
}

function App() {
  const [popup, setPopup] = useState(false);

  function handlePopup() {
    setPopup((prev) => !prev);
  }

  async function getDataReddit(subreddit) {
    try {

      /* can´t continue the project becouse, this link has been blocked by CORS policy: No 'Access-Control-Allow-Origin'  */
      const redditUrl = `https://www.reddit.com/r/javascript.json`;
      let response = await fetch(redditUrl);
      let data= await response.json();
      console.log(data);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <header>
        <h1>Reddit Feed Viewer</h1>
      </header>

      <Main handlePopup={handlePopup} />
      <Popup
        popup={popup}
        handlePopup={handlePopup}
        getDataReddit={getDataReddit}
      />
    </>
  );
}

export default App;
