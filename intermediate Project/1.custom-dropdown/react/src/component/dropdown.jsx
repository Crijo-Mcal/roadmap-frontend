import { useState } from "react";
import "./dropdown.css";


function ListItems({ active, onSelect }) {
  // Array of dropdown items
  const itemsName = [
    "First Item",
    "Second Item",
    "Third Item",
    "Fourth Item",
    "Fifth Item",
  ];

  // State to track which item is checked
  const [checkedItems, setCheckedItems] = useState(itemsName.map(() => false));

  // Handle click on a list item
  function handleClick(index) {
    // Create a new array where only the clicked item is true (checked)
    const newChecked = itemsName.map((_, i) => i === index);
    setCheckedItems(newChecked);

    // Notify parent which item was selected
    onSelect(itemsName[index]);
  }

  // If dropdown is not active, render nothing
  if (!active) return null;

  return (
    <ul className="items_options">
      {itemsName.map((item, i) => (
        <li key={i} onClick={() => handleClick(i)}>
          <span className="item_name">{item}</span>{" "}
          {checkedItems[i] && <span className="marck">✅</span>}
        </li>
      ))}
    </ul>
  );
}


export default function Dropdown() {
  // State to track if dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to track currently selected item
  const [selectedItem, setSelectedItem] = useState("Select an Item");

  // Toggle dropdown open/close
  function handleToggle() {
    setIsOpen(prev => !prev);
  }

  // Handle item selection from child
  function handleSelect(item) {
    setSelectedItem(item); 
    setIsOpen(false);
  }

  return (
    <div className="dropdown_container">
      
      <div className="item-selected" onClick={handleToggle}>
        <h2>{selectedItem}</h2>
        <div className="arrow">🔽</div>
      </div>

      {/* List of items - child component */}
      <ListItems active={isOpen} onSelect={handleSelect} />
    </div>
  );
}
