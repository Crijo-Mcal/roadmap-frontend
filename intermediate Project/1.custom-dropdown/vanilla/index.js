/* ===== Selected item text ===== */
let item_selected = document.querySelector(".item-selected h2");

/* ===== Arrow element and state ===== */
let arrow = document.querySelector(".arrow");
let arrow_up = true;

/* ===== Options container and lists ===== */
let items_options = document.querySelector(".items_options");
let items_options_list = document.querySelectorAll(".items_options li");
let items_options_name = document.querySelectorAll(".item_name");
let items_options_marck = document.querySelectorAll(".marck");



/* ===== Click event on arrow ===== */
arrow.onclick = () => {
  // Toggle arrow state
  arrow_up = !arrow_up;

  if (!arrow_up) {
    // Arrow is pointing down → show options
    arrow.innerHTML = "🔼";
    items_options.classList.add("items_options_active");
  }
  
  if(arrow_up){
    // Arrow is pointing up → hide options
    arrow.innerHTML = "🔽";
    items_options.classList.remove("items_options_active");
  }
};

/* ===== Click event for each option ===== */
  for (const [i, element] of items_options_list.entries()) {
    element.onclick = () => {
      // Remove "marck_active" from all items
      for (const j of items_options_list.keys()) {
        items_options_marck[j].classList.remove("marck_active");
      }
      // Add "marck_active" to the clicked item
      items_options_marck[i].classList.add("marck_active");

      // Update the header with the selected item name
      item_selected.innerHTML = items_options_name[i].innerHTML;

      // close the dropdown
      items_options.classList.remove("items_options_active");
       arrow_up=true;
       arrow.innerHTML = "🔽";
       console.log(arrow_up);
    };
  }

  
  

