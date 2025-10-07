import { useEffect, useState } from "react";
import "./apiConnet"; // Custom script (if needed)
import "./App.css"; // Styles for the project
import startImg from "../assets/star.png"; // Star icon
import gitImg from "../assets/git.png"; // Fork icon
import reportImg from "../assets/report.png"; // Issues icon

// URL for fetching available programming languages
const languages_api =
  "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

// Input form component: dropdown to select language
function InputForm({ optionsLanguage, get_Language_info }) {
  const [value, setvalue] = useState(""); // State for selected language

  function handleChange(e) {
    setvalue(e.target.value); // Update selected language
  }

  return (
    <div className="container">
      {/* Title section */}
      <div className="title_container">
        <span className="qurry">1</span>
        <h2>GitHub Repository Finder</h2>
      </div>

      {/* Language selection dropdown */}
      <form className="input_container">
        <select
          id="select"
          value={value}
          onChange={(e) => (handleChange(e), get_Language_info(e.target.value))} // Update state and fetch repos
        >
          <option value="">languages</option>
          {optionsLanguage.map((x, i) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

// Component to display status messages or repository info
function TextResult({ status, children }) {
  switch (status) {
    case "none":
      return (
        <div className="result_container" style={{ color: "green" }}>
          Please select a language
        </div>
      );
    case "loading":
      return (
        <div className="result_container" style={{ color: "orange" }}>
          Loading, Please Wait
        </div>
      );
    case "successed":
      return (
        <div className="result_container" style={{ color: "black" }}>
          {children} {/* Render repository details */}
        </div>
      );
    case "error":
      return (
        <div className="result_container" style={{ color: "red" }}>
          Error fetching repositories
        </div>
      );
    default:
      return null;
  }
}

// Component to show selected repository details
function OutputResult({ refreshInfo, status, languageSelectInfo }) {
  return (
    <>
      <TextResult status={status}>
        <h2>{languageSelectInfo.className}</h2> {/* Repository name */}
        <p>{languageSelectInfo.description}</p> {/* Repository description */}
        <div className="mini_info">
          <div className="language">
            <div className="circle"></div>
            <span>{languageSelectInfo.language}</span> {/* Programming language */}
          </div>
          <div className="stars">
            <img src={startImg} alt="star" />
            <span>{languageSelectInfo.stargazers_count}</span> {/* Stars count */}
          </div>
          <div className="branch">
            <img src={reportImg} alt="branch" />
            <span>{languageSelectInfo.forks_count}</span> {/* Forks count */}
          </div>
          <div className="issue">
            <img src={gitImg} alt="issue" />
            <span>{languageSelectInfo.open_issues_count}</span> {/* Open issues */}
          </div>
        </div>
      </TextResult>

      {/* Refresh button to show another random repository */}
      <div className="button_container">
        {status != "none" && (
          <button className="refresh" onClick={refreshInfo}>
            Click to retry
          </button>
        )}
      </div>
    </>
  );
}

function App() {
  // State variables
  const [optionsLanguage, setLanguageSelect] = useState([]); // List of languages
  const [languageSelectInfo, setLanguageSelectInfo] = useState({}); // Currently displayed repository
  const [status, setStatus] = useState("none"); // Loading / success / error
  const [data, setData] = useState([]); // Fetched repository list
  const [randomIndex, setRandomIdex] = useState("0"); // Index for random repository (currently unused)

  /* Fetch available programming languages */
  useEffect(() => {
    (async function get_Language() {
      try {
        let response = await fetch(languages_api);
        if (!response.ok) throw new Error("404"); // Handle fetch error
        let results = await response.json();
        const finalResult = results.map((x) => x.value).filter((x) => x !== ""); // Remove empty values
        setLanguageSelect(finalResult); // Save to state
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  /* Fetch repositories for selected language */
  async function get_Language_info(language) {
    if (!language) return;
    setStatus("loading"); // Set loading status
    let url_api = `https://api.github.com/search/repositories?q=language:${language}&sort=stars`;
    try {
      let response = await fetch(url_api);
      if (!response.ok) throw new Error(); // Handle API error

      setStatus("successed");
      let data = await response.json(); // Parse response
      setData(data); // Save fetched data
      setRandomIdex(Math.floor(Math.random() * data.items.length)); // Random index
      setLanguageSelectInfo(data.items[randomIndex]); // Set displayed repository
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  }

  /* Refresh button function (pick random repository) */
  function refreshInfo() {
    setRandomIdex(Math.floor(Math.random() * data.items.length)); // Randomize index
    setLanguageSelectInfo(data.items[randomIndex]); // Update displayed repository
    console.log(data); // Debugging
  }

  return (
    <>
      {/* Language selection form */}
      <InputForm
        optionsLanguage={optionsLanguage}
        get_Language_info={get_Language_info}
      />

      {/* Repository details and refresh button */}
      <OutputResult
        refreshInfo={refreshInfo}
        status={status}
        languageSelectInfo={languageSelectInfo}
      />
    </>
  );
}

export default App;
