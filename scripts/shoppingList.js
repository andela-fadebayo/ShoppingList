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
  createNewItem: function (item, quantity, cost) {  //add item1, item2 and item3 to cater for quantity and cost in the values passed into the function here.
                   //create a new list item
                   var listItem = document.createElement("li");
                     var checkBox = document.createElement("input");
                     var labelItem = document.createElement("label");
                     var labelQuantity = document.createElement("label");
                     var labelCost = document.createElement("label");                     
                     var editItemInput = document.createElement("input");
                     var editQuantityInput = document.createElement("input");
                     var editCostInput = document.createElement("input");
                     var editButton = document.createElement("button");
                     var deleteButton = document.createElement("button");

                    //set modification parameters for each item
                    checkBox.type = "checkbox";
                    editItemInput.type = "text";
                    editQuantityInput.type = "text";
                    editCostInput.type = "text";

                    editButton.innerText = "Edit";
                    editButton.className = "edit";

                    deleteButton.innerText = "Delete";
                    deleteButton.className = "delete";

                    //place the item, its quantity and cost into each label
                    labelItem.innerText = item;
                    labelQuantity.innerText = quantity;
                    labelCost.innerText = cost;

                    //append each item 
                    listItem.appendChild(checkBox);
                    listItem.appendChild(labelItem);
                    listItem.appendChild(labelQuantity);
                    listItem.appendChild(labelCost);
                    listItem.appendChild(editItemInput);
                    listItem.appendChild(editQuantityInput);
                    listItem.appendChild(editCostInput);
                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);                  

                    return listItem;
                 },

  addItem: function () { 
             console.log("Add item...");

             //add new list item             
             var newListItem = ShoppingList.createNewItem(ShoppingList.newItem.value, ShoppingList.itemQuantity.value, ShoppingList.itemCost.value);
        
             //append this new list item to itemsListHolder
             ShoppingList.itemsListHolder.appendChild(newListItem);
             ShoppingList.bindItemEvents(newListItem, ShoppingList.itemsChecked);

             ShoppingList.newItem.value = "";
             ShoppingList.itemQuantity.value = "";
             ShoppingList.itemCost.value = "";
           },
  editItem: function () {
              console.log("Edit item...");

              var listItem = this.parentNode;

              var editItemInput = listItem.querySelector("input[type=text]");
              var editQuantityInput = listItem.querySelector(".itemB");
              var editCostInput = listItem.querySelector("input[type=text]");
              var labelItem = listItem.querySelector(".itemA");
              var labelQuantity = listItem.querySelector(".itemB");
              var labelCost = listItem.querySelector("label");
              //include labels for quantity and cost here

              var containsClass = listItem.classList.contains("editMode");
       
              //check if class of the parent is editMode
              if (containsClass) {
                labelItem.innerText = editItemInput.value;
                labelQuantity.innerText = editQuantityInput.value;
                labelCost.innerText = editCostInput.value;
              }
              else {
                editItemInput.value = labelItem.innerText;
                editQuantityInput.value = labelQuantity.innerText;
                editCostInput.value = labelCost.innerText;
              }

              //Toggle list item from edit mode to saved mode
              listItem.classList.toggle("editMode");
           },
  deleteItem: function () {
                console.log("Delete item...");

                var listItem = this.parentNode;
                var ol = listItem.parentNode;
                ol.removeChild(listItem);
              },
  itemsChecked: function () {
                  console.log("item checked...");

                  var listItem = this.parentNode;
                  ShoppingList.checkedOffHolder.appendChild(listItem);
                  ShoppingList.bindItemEvents(listItem, ShoppingList.itemsUnchecked);
                },
                
  itemsUnchecked: function () {
                    console.log("item unchecked...");

                    var listItem = this.parentNode;
                    ShoppingList.itemsListHolder.appendChild(listItem);
                    ShoppingList.bindItemEvents(listItem, ShoppingList.itemsChecked);
                  },
  //function to bind item events 
  bindItemEvents: function (listItems, checkBoxEventHandler) {  
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