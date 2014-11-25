//using object construct to implement the shopping list app

var ShoppingList = {
  newItem: document.getElementById("newItem"), //new item input
  itemQuantity: document.getElementById("quantity"), //quantity of items
  itemCost: document.getElementById("cost"), //cost of items
  addButton: document.getElementsByTagName("button")[0], //first button on page
  itemsListHolder: document.getElementById("itemsList"), //incompleted items (items not bought yet)
  checkedOffHolder: document.getElementById("checkedOffItems"),  //items bought (completed) and checked off.
  addItem: function () { 
             console.log("Add item..."); 
           },
  editItem: function () {
              console.log("Edit item...");
           },
  deleteItem: function () {
                console.log("Delete item...");
              },
  itemsChecked: function () {
                  console.log("item checked...");
                },
  itemsUnchecked: function () {
                    console.log("item unchecked...");
                  },
  var bindItemEvents: function(listItemEvents, checkBoxEventHandler) {  
                        console.log("bind list items events test");
                      }
}

//click handlers to handle addItem function
ShoppingList.addButton.onclick = ShoppingList.addItem;


//cycle over each incomplete items ol list items
  //for each list item
  for (var i = 0; i < ShoppingList.itemsListHolder.children.length; i++) {
    //bind events to list item's children (itemsChecked)
    ShoppingList.bindItemEvents(ShoppingList.itemsListHolder.children[i], ShoppingList.itemsChecked);
  }


//cycle over each completed items ol list items
  //for each list item
  for (var j = 0; j < ShoppingList.checkedOffHolder.children.length; j++) {
    //bind events to list item's children (itemsUnchecked) 
    ShoppingList.bindItemEvents(ShoppingList.checkedOffHolder.children.length[j], ShoppingList.itemsUnchecked);
  }