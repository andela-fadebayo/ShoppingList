// Andela Project 4 - my Shopping List App with JavaScript
// Fiyinfoluwa Adebayo
// 21-25th November, 2014

//Users should be able to:
    //add items to a shopping list cart, including cost and quantity.
    //check-off items from the list after buying them.
    //edit and delete incomplete list items.
    //edit and delete complete items.

//using object construct to implement the shopping list app

var ShoppingList = {
  newItem: document.getElementById("newItem"), //new item input
  itemQuantity: document.getElementById("quantity"), //quantity of items
  itemCost: document.getElementById("cost"), //cost of items
  addButton: document.getElementById("listBtn"), //first button on page
  itemsListHolder: document.getElementById("itemsList"), //incompleted items (items not bought yet)
  checkedOffHolder: document.getElementById("checkedOffItems"),  //items bought (completed) and checked off.
  //define all functions

  //function to create new item
  createNewItem: function (item) {  //add item1, item2 and item3 to cater for quantity and cost in the values passed into the function here.
                   //create a new list item
                   var listItem = document.createElement("li");
                     var checkBox = document.createElement("input");
                     var label = document.createElement("label");
                     //define variables here for quantity and cost
                     var editItemInput = document.createElement("input");
                     var editButton = document.createElement("button");
                     var deleteButton = document.createElement("button");

                    //set modification parameters for each item

                    checkBox.type = "checkbox";
                    editItemInput.type = "text";

                    editButton.innerText = "Edit";
                    editButton.className = "edit";

                    deleteButton.innerText = "Delete";
                    deleteButton.className = "delete";

                    label.innerText = item;
                    //set label.innerText for quantity and cost here

                    //append each item 
                    listItem.appendChild(checkBox);
                    listItem.appendChild(label);
                    listItem.appendChild(editItemInput);
                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);
                    // append child for quantity and cost. ensure to follow the right order in which they should appear
                    // listItem.appendChild(checkBox);
                    // listItem.appendChild(checkBox);

                    return listItem;
                 },

  addItem: function () { 
             console.log("Add item...");

             //add new list item             
             var newListItem = ShoppingList.createNewItem(ShoppingList.newItem.value);

             //append this new list item to itemsListHolder
             ShoppingList.itemsListHolder.appendChild(newListItem);
             ShoppingList.bindItemEvents(newListItem, ShoppingList.itemsChecked);

             ShoppingList.newItem.value = "";
           },
  editItem: function () {
              console.log("Edit item...");

              var listItem = this.parentNode;
              var editInput = listItem.querySelector("input[type=text]");
              var label = listItem.querySelector("label");
              //include labels for quantity and cost here
           },
  deleteItem: function () {
                console.log("Delete item...");

                var listItem = this.parentNode;

              },
  itemsChecked: function () {
                  console.log("item checked...");
                },
  itemsUnchecked: function () {
                    console.log("item unchecked...");
                  },
  //function to bind item events 
  bindItemEvents: function (listItems, checkBoxEventHandler) {  
                        // console.log("bind list items events test");

                        // console.log(listItems);
                        //select list items events tasks (listItems') children
                        //bind editItem to editButton
                        //bind deleteItem to deleteButton
                        //bind checkBoxEvenHandler to checkBox


                        var checkBox = listItems.querySelector("input[type=checkbox]");
                        var editButton = listItems.querySelector("button.edit");
                        var deleteButton = listItems.querySelector("button.delete");

                        //bind items edit task to edit buttons
                        checkBox.onchange = checkBoxEventHandler;
                        editButton.onclick = ShoppingList.editItem;
                        deleteButton.onclick = ShoppingList.deleteItem;
                      }
};

//click handlers to handle addItem function
ShoppingList.addButton.addEventListener("click", ShoppingList.addItem);

//cycle over each incomplete items ol list items
  //for each list item
  for (var i = 0; i < ShoppingList.itemsListHolder.children.length; i++) {
    // bind events to list item's children (itemsChecked)
    ShoppingList.bindItemEvents(ShoppingList.itemsListHolder.children[i], ShoppingList.itemsChecked);
  }

//cycle over each completed items ol list items
 //for each list item
  for (var i = 0; i < ShoppingList.checkedOffHolder.children.length; i++) {
    //bind events to list item's children (itemsUnchecked) 
    ShoppingList.bindItemEvents(ShoppingList.checkedOffHolder.children[i], ShoppingList.itemsUnchecked);
  }