// API endpoint for the list of programming languages
const languages_api =
  "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

/* Select DOM elements */
let result_container = document.querySelector(".result_container"); // Container to display repository info or messages
let select_container = document.querySelector(".input_container select"); // Dropdown select for languages

/* Function to update UI state */
function state(status) {
  switch (status) {
    case "none":
      // Default state before user selects a language
      result_container.innerHTML = "Please select a language";
      result_container.style.color = "green";
      break;
    case "loading":
      // While fetching data
      result_container.innerHTML = "Loading, Please Wait.";
      result_container.style.color = "black";
      break;
    case "successed":
      // When data is successfully fetched
      result_container.style.backgroundColor = "rgba(215, 252, 172, 1)";
      result_container.style.color = "black";
      result_container.innerHTML = "";
      break;
    case "error":
      // When fetch fails or API returns an error
      result_container.style.backgroundColor = "rgba(247, 184, 184, 1)";
      result_container.style.color = "red";
      result_container.innerHTML = "Error fetching repositories";
      break;
  }
}

/* Fetch and populate the language dropdown */
async function select_language() {
  try {
    let response = await fetch(languages_api);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    let data = await response.json();

    // Create an <option> for each language
    for (const element of data) {
      if (element.value != "") {
        let new_element = document.createElement("option"); 
        new_element.value = element.value; 
        new_element.innerHTML = element.value; 
        select_container.appendChild(new_element); 
      }
    }
  } catch (error) {
    console.error(error); 
  }
}

/* Fetch GitHub repositories and display info */
async function display_info() {
  let selectedLanguage = select_container.value;
  let url_api = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars`;

  state("loading"); // Show loading state

  try {
    let response = await fetch(url_api);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    let data = await response.json();

    state("successed"); // Update UI to success

    // Pick a random repository from results
    let random_index = Math.floor(Math.random() * data.items.length);
    info_element(data.items[random_index]);

    // Display refresh button
    button_display("refresh", "Refresh", display_info);

  } catch (error) {
    console.error(error);
    state("error"); // Show error state

    // Display retry button
    button_display("retry", "Click to retry", () => {
      location.reload(); // Reloads page on retry
    });
  }
}

/* Display repository details in the result container */
function info_element(data) {
  let h2 = document.createElement("h2");
  h2.textContent = data.name; // Repository name

  let p = document.createElement("p");
  p.textContent = data.description; // Repository description

  let div = document.createElement("div");
  div.classList.add("mini_info"); 
  div.innerHTML = `
    <div class="language">
      <div class="circle"></div>
      <span>${data.language}</span>
    </div>
    <div class="stars">
      <img src="image/star.png" alt="star">
      <span>${data.stargazers_count}</span>
    </div>
    <div class="branch">
      <img src="image/git.png" alt="branch">
      <span>${data.forks_count}</span>
    </div>
    <div class="issue">
      <img src="image/report.png" alt="issue">
      <span>${data.open_issues_count}</span>
    </div>`;

  result_container.append(h2, p, div); 
}

/* Function to create a button and attach a callback */
function button_display(class_name, value, callback) {
  let button_container = document.querySelector(".button_container");
  button_container.innerHTML = `<button class="${class_name}">${value}</button>`;

  let button = document.querySelector(`.${class_name}`);
  button.addEventListener("click", callback); 
}

/* Initial setup */
state("none"); // Set default UI state
select_language(); // Populate dropdown
select_container.addEventListener("change",display_info);
