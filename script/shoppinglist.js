// Andela Project 4 - my Shopping List App with JavaScript
// Fiyinfoluwa Adebayo
// 21-25th November, 2014

//Users should be able to:
    //add items to a shopping list cart, including cost and quantity.
    //check-off items from the list after buying them.
    //edit and delete incomplete list items.
    //edit and delete complete items.

//validate users input (blanks and space checks)

//first, define all variables.
var newItem = document.getElementById("newItem"); //new item input
var itemQuantity = document.getElementById("quantity"); //quantity of items
var itemCost = document.getElementById("cost"); //cost of items
var addButton = document.getElementsByTagName("button")[0]; //first button on page
var itemsListHolder = document.getElementById("itemsList"); //incompleted items (items not bought yet)
var checkedOffHolder = document.getElementById("checkedOffItems");  //items bought (completed) and checked off.

//function to create new item
var createNewItem = function (item1, item2, item3) {
  //create list item
  var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");  //checkbox
    //labels
    var labelItem = document.createElement("label");
    var labelQuantity = document.createElement("label");
    var labelCost = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //input (quantity)
    var editQuantity = document.createElement("input");
    //input (cost)
    var editCost = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each elements needs modifying
    checkBox.type = "checkbox";
    editInput.type = "text";
    editQuantity.type = "text";
    editCost.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    labelItem.innerText = item1;
    labelQuantity.innerText = item2;
    labelCost.innerText = item3;

    //Each elements needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(labelItem);
    listItem.appendChild(labelQuantity);
    listItem.appendChild(labelCost);
    listItem.appendChild(editInput);
    listItem.appendChild(editQuantity);
    listItem.appendChild(editCost);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  return listItem;
}

//Add a new item
var addItem = function() {
  console.log("Add item...");
  //when the button is pressed
  //create new list item with the text from #newItem;
    var listItem = createNewItem(newItem, itemQuantity, itemCost); 

    //Append listItem to itemsListHolder
    itemsListHolder.appendChild(listItem);
}

//Edit an existing item
var editItem = function() {
  console.log("Edit item...");
  //when the edit button is pressed
    //if the class of the parent is .editMode
      //switch from .editMode
      //label text become the input's value
    //else
      //switch to .editMode
      //input value becomes the label's text.

    //Toggle .editMode on the parent.
}

//Delete an existing item
var deleteItem = function() {
  console.log("Delete item...");
  //when the delete button is pressed
  var listItem = this.parentNode;
  var ol = listItem.parentNode;

    //remove the parent list item from the ol
    ol.removeChild(listItem);
}

//Check an item as bought
var itemsChecked = function() {
  console.log("item checked...");
  //when the checkbox is checked
    //append the list item to the #checkedOffItems section
    var listItem = this.parentNode;
    checkedOffHolder.appendChild(listItem);
    bindItemEvents(listItem, itemsUnchecked);
}

//unCheck an item as incomplete
var itemsUnchecked = function() {
  console.log("item unchecked...");
  //when the checkbox is unchecked
    //append the item to the #itemsList section
    var listItem = this.parentNode;
    itemsListHolder.appendChild(listItem);
    bindItemEvents(listItem, itemsChecked);
}

//click handlers to handle addItem function
addButton.onclick = addItem;

// create a function to bind items events
var bindItemEvents = function(listItems, checkBoxEventHandler) {
  console.log("bind list items events test");
    //select listItemEvents' children
    var checkBox = listItems.querySelector("input[type=checkbox]");
    var editButton = listItems.querySelector("button.edit");
    var deleteButton = listItems.querySelector("button.delete");

    //bind editItem to edit button
    editButton.onclick = editItem;
    //bind deleteItem to delete button
    deleteButton.onclick = deleteItem;
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over each incomplete items ol list items
  //for each list item
  for (var i = 0; i < itemsListHolder.children.length; i++) {
    //bind events to list item's children (itemsChecked)
    bindItemEvents(itemsListHolder.children[i], itemsChecked);
  }


//cycle over each completed items ol list items
  //for each list item
  for (var j = 0; j < checkedOffHolder.children.length; j++) {
    //bind events to list item's children (itemsUnchecked) 
    bindItemEvents(checkedOffHolder.children.length[j], itemsUnchecked);
  }