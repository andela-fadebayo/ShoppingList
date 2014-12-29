/*Andela Project 4 - my Shopping List App with JavaScript
  Fiyinfoluwa Adebayo
  21-25th November, 2014
  (re-written on 14th December, 2014)*/


/*Users should be able to:
    Add items to a shopping list cart, including cost and quantity.
    Check-off items from the list after buying them.
    Edit and delete incomplete list items (items to buy).
    Delete completed items (checked off items).*/

//using object construct to implement the shopping list app

var shoppingList = {
  //grab user input data and button
  newItem: document.getElementById("newItem"),
  itemQuantity: document.getElementById("quantity"),
  itemCost: document.getElementById("cost"),
  addItemButton: document.getElementById("addItemButton"),

  //grab items to buy and checked off lists
  itemsListHolder: document.getElementById("itemsList"),
  checkedOffHolder: document.getElementById("checkedOffItems"),

  //define all functions
  status: function (message) {
            var getStatus = document.getElementById("status");
            getStatus.innerHTML = message;
          },

  createNewItem: function (item, quantity, cost) {
                   
                   //create a new list li item
                   var listItem = document.createElement("li");
                   var checkBox = document.createElement("input");
                   
                   //labels
                   var labelItem = document.createElement("label");
                   var labelQuantity = document.createElement("label");
                   var labelCost = document.createElement("label");

                   //edit inputs
                   var editItemInput = document.createElement("input");
                   var editQuantityInput = document.createElement("input");
                   var editCostInput = document.createElement("input");

                   //buttons
                   var editButton = document.createElement("button");
                   var deleteButton = document.createElement("button");

                   //styling tags
                   var breakSpan = document.createElement("span");
                   var nairaSpan = document.createElement("span");

                   //set the type of input and button
                   checkBox.type = "checkbox";
                   labelItem.type = "text";
                   labelQuantity.type = "text";
                   labelCost.type = "text";

                   editButton.innerText = "Edit";
                   editButton.className = "edit";
                   deleteButton.innerText = "Delete";
                   deleteButton.className = "delete";

                   //attach edit inputs to a class for css styling
                   editItemInput.className = "itemA";
                   editQuantityInput.className = "itemB";
                   editCostInput.className = "itemC";
                   labelItem.className = "itemTextA";
                   labelQuantity.className = "itemTextB";
                   labelCost.className = "itemTextC";

                   breakSpan.className = "breakFirst";
                   nairaSpan.className = "nairaSpan";
                   nairaSpan.innerText = "N";

                   //place the item, quantity and cost into the labels created above
                   labelItem.innerText = item;
                   labelQuantity.innerText = quantity;
                   labelCost.innerText = cost;

                   //now all list items are created, append them to the li tag
                   listItem.appendChild(checkBox);
                   listItem.appendChild(labelItem);
                   listItem.appendChild(labelQuantity);
                   listItem.appendChild(nairaSpan);
                   listItem.appendChild(labelCost);
                   listItem.appendChild(breakSpan);
                   listItem.appendChild(editItemInput);
                   listItem.appendChild(editQuantityInput);
                   listItem.appendChild(editCostInput);
                   listItem.appendChild(editButton);
                   listItem.appendChild(deleteButton);

                   //return list item out of this function
                   return listItem;
                 }, 

  addItem: function () {

             //collect the values of items, their quantity and cost
             var newItemValue = shoppingList.newItem.value;
             var newQuantityValue = shoppingList.itemQuantity.value;
             var newCostValue = parseInt(newQuantityValue, 10) * parseInt(shoppingList.itemCost.value, 10);

             //validate inputs
             if (newItemValue === "") {
               shoppingList.status("Please enter an item to purchase");
             }
             else if (newCostValue === "" || newQuantityValue === "") {
               shoppingList.status("How much does '" + newItemValue + "' cost?")
             }
             else if (isNaN(newQuantityValue) || isNaN(newCostValue)) {
               shoppingList.status("Quantity and Cost must be numbers!");
             } 
             else {
               shoppingList.status("");
               //using the list item created, add a new item
               var newListItem = shoppingList.createNewItem(newItemValue, newQuantityValue, newCostValue);

               //append the new list item to items list holder
               shoppingList.itemsListHolder.appendChild(newListItem);

               //use the bind event function to bind this new list created to items list div
               shoppingList.bindEvents(newListItem, shoppingList.itemsChecked);

               //clear all input field and status div
               shoppingList.newItem.value = "";
               shoppingList.itemQuantity.value = "";
               shoppingList.itemCost.value = "";

               shoppingList.status("You successfully added an item to your cart!");
             } 
           },

  editItem: function () {
              var listItem = this.parentNode;

              var editItemInput = listItem.querySelector(".itemA");
              var editQuantityInput = listItem.querySelector(".itemB");
              var editCostInput = listItem.querySelector(".itemC");

              var labelItem = listItem.querySelector(".itemTextA");
              var labelQuantity = listItem.querySelector(".itemTextB");
              var labelCost = listItem.querySelector(".itemTextC");

              var containsClass = listItem.classList.contains("editMode");

              //select edit button
              var editButton = listItem.querySelector("button.edit");

              //if the class of the parenet is .editMode
              if(containsClass) {
                //switch from .editMode
                //label text becomes the input's value
                editButton.innerText = "Edit";
                
                //hide the input field when done editing
                editItemInput.style.display = "none";
                editQuantityInput.style.display = "none";
                editCostInput.style.display = "none";

                //multiply quantity and cost values
                var quantityInput = editQuantityInput.value;
                var costAndQuantity = parseInt(quantityInput, 10) * parseInt(editCostInput.value, 10);

                //save edit inputs in label text
                labelItem.innerText = editItemInput.value;
                labelQuantity.innerText = quantityInput;
                labelCost.innerText = costAndQuantity;
              }
              else {
                //switch to .editMode
                //input value becomes the label's text#
                editButton.innerText = "Save";

                //show the input field when done editing
                editItemInput.style.display = "block";
                editQuantityInput.style.display = "block";
                editCostInput.style.display = "block";

                //grab label text and place in edit inputs for editing
                editItemInput.value = labelItem.innerText;
                editQuantityInput.value = labelQuantity.innerText;
                editCostInput.value = labelCost.innerText;
              }

              //toggle to and from .editMode on the list item
              listItem.classList.toggle("editMode");
            },

  deleteItem: function () {

                //select item and ordered parent list
                var listItem = this.parentNode;
                var ol = listItem.parentNode;

                //remove the parent list item from the ol
                ol.removeChild(listItem);
              },

  bindEvents: function(tasksListItem, checkBoxEvents) {
                
                //select tasksListItem's children
                var checkBox = tasksListItem.querySelector("input[type=checkbox]");
                var editButton = tasksListItem.querySelector("button.edit");
                var deleteButton = tasksListItem.querySelector("button.delete");

                //bind events to the edit and delete buttons
                editButton.onclick = shoppingList.editItem;
                deleteButton.onclick = shoppingList.deleteItem;
                checkBox.onchange = checkBoxEvents;
              },

  itemsUnchecked: function () {
                    //for items in itemsListHolder and have not been checked
                    var listItem = this.parentNode;
                    shoppingList.itemsListHolder.appendChild(listItem);
                    shoppingList.bindEvents(listItem, shoppingList.itemsChecked);
                  },

  itemsChecked: function () {
                  //for items in red that have been checked
                  var listItem = this.parentNode;
                  shoppingList.checkedOffHolder.appendChild(listItem);
                  shoppingList.bindEvents(listItem, shoppingList.itemsUnchecked);
                }

};

shoppingList.addItemButton.addEventListener("click", shoppingList.addItem);

//cycle over items list holder ol list
for (var i = 0; i < shoppingList.itemsListHolder.children.length; i++) {
                      //bind events to the items list children
                      shoppingList.bindEvents(shoppingList.itemsListHolder.children[i], shoppingList.itemsChecked);
                    };

//cycle over checked list items ol list
for (var i = 0; i < shoppingList.checkedOffHolder.children.length; i++) {
                       //bind events to the checked off list
                       shoppingList.bindEvents(shoppingList.checkedOffHolder.children[i], shoppingList.itemsUnchecked);
                     };
