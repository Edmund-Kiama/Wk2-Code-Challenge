                /*VARIABLE INITIALIZATION */

//empty shopping list array or from local storage
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
let purchasedList = JSON.parse(localStorage.getItem('purchasedList')) || [];

//Variables
const form = document.getElementById('inputForm');
const clearList = document.getElementById('clearAll');
const hiddenShoppingContainer = document.querySelector('.hiddenShoppingContainer');
const hiddenPurchasedContainer = document.querySelector('.hiddenPurchasedContainer');

                /*LOCAL STORAGE SECTION */

//save to local storage
const saveToLocal = () => {
    localStorage.setItem('shoppingList',JSON.stringify(shoppingList));
    localStorage.setItem('purchasedList',JSON.stringify(purchasedList));
}

            /*CLEAR BUTTON SECTION */

//hides the clear all button and additional text
const clearAllButton = () => {
    //hides the clear all button
    const clearAllHide = document.getElementById("clearAll");
    if (shoppingList.length < 1 && purchasedList.length < 1 ) {
        clearAllHide.classList.add('hidden')
    } else {
        clearAllHide.classList.remove('hidden')
    }

    //Targets shopping total
    const shoppingHide = document.getElementById("shoppingTitle");
    const shoppingPriceHide = document.getElementById("totalShoppingPrice");
    //Targets Purchased total
    const purchasedHide = document.getElementById("purchasedTitle");
    const purchasedPriceHide = document.getElementById("totalPurchasedPrice");
    //Targets Aggregate total
    const aggregateHide = document.getElementById("aggregateTitle");
    const aggregatePriceHide = document.getElementById("aggregateTotalPrice");
    
    //hide shopping total
    if(shoppingList.length < 1) {
        shoppingHide.classList.add('hidden') 
        shoppingPriceHide.classList.add('hidden')
    } else {
        shoppingHide.classList.remove('hidden')
        shoppingPriceHide.classList.remove('hidden')
    }
    //hides purchased total
    if(purchasedList.length < 1) {
        purchasedHide.classList.add('hidden') 
        purchasedPriceHide.classList.add('hidden')
    } else {
        purchasedHide.classList.remove('hidden')
        purchasedPriceHide.classList.remove('hidden')
    }
    
    //hides aggregate total
    if(shoppingList.length < 1 && purchasedList.length < 1) {
        aggregateHide.classList.add('hidden') 
        aggregatePriceHide.classList.add('hidden')
    } else {
        aggregateHide.classList.remove('hidden')
        aggregatePriceHide.classList.remove('hidden')
    }
}
clearAllButton();

            /*EVENT LISTENER */

//Clearing the whole List
clearList.addEventListener('click',() => {
    //resets all list back to empty lists
    shoppingList = [];
    purchasedList = [];

    //calls display functions to update the DOM
    saveToLocal();
    displayShoppingItems();
    displayPurchasedItems();
    clearAllButton();

    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
})

//From event listener
form.addEventListener('submit',(event) => {
    //prevent form submission
    event.preventDefault();
    
    //Targets the input value fields
    const item = event.target.itemInput.value
    const price = event.target.priceInput.value

    
    //Adds the items and price to the empty shoppingList array
    shoppingList.push({
        name: item,
        price: (parseFloat(price)).toFixed(2) //changes the input price into float and sets it to 2 dp
    });

    //resets form inputs
    form.reset();
    saveToLocal();
    displayShoppingItems();
    clearAllButton();

    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
});

            /*DISPLAY SECTION */

//Function to display the shopping items
const displayShoppingItems = () => {
    //Ensures the container is empty
    hiddenShoppingContainer.innerHTML = '';

    //Generates HTML for each item in the shopping list
    shoppingList.forEach((item,index) => {
        const itemCard = `
        <div class="item">
            <div id="${index}" class="shopping">
                <p><strong>${item.name}</strong></p>
                <p><em>Kshs ${item.price}</em></p>
            </div>
            
            <div class="check">
                <label for="mark-${index}">Mark as purchased</label>
                <input 
                    type="checkbox" 
                    id="mark-${index}"
                    onclick="togglePurchased(${index})"
                >
            </div>
            <div>
                <div class="hiddenShown">
                    <button 
                        id="edit-${index}"
                        class="hidden"
                        onclick="editList(${index})"
                    >
                    Edit
                    </button>

                    <div id="popupContainer-${index}" class="popupHidden">
                        <div class="containsPopUp">
                            <div class="popupHeader">
                                <p>Editing Item...</p>
                                <button 
                                    id="closePopup-${index}"
                                    onclick="closePopup(${index})"
                                >
                                    <img 
                                        src="./images/close.png" 
                                        alt="close"
                                    >
                                </button>
                            </div>

                            <div id="popupId-${index}" >
                                <div id="editForm-${index}">
                                    <p>Item</p>
                                    <input 
                                        type="text"
                                        placeholder='Enter new Item'
                                        id="itemEdit-${index}"
                                        required
                                    >
                                    <br>
                                    <p>Price</p>
                                    <input 
                                        type="number" 
                                        placeholder='Enter new price'
                                        id="priceEdit-${index}"
                                        required
                                    >
                                    <br>
                                    <button class="thatWhichEdits" onclick='editMethod(${index})'>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        id="delete-${index}"
                        class="hidden"
                        onclick="deleteShoppingList(${index})"
                    >
                    Delete
                    </button>
                </div>
                
                <button class="showMore" id="showMore-${index}" onclick="showMore(${index})" >
                    <img src="./images/dots.png" alt="3-dots" width="15px">
                </button>
                
            </div>
         </div>`;

         clearAllButton(); //Toggles clear all button

         return hiddenShoppingContainer.insertAdjacentHTML('beforeend', itemCard);
    });
}

//Function to display the purchased items
const displayPurchasedItems = () => {
    //Ensures the container is empty
    hiddenPurchasedContainer.innerHTML = '';

    //Generates HTML for each item in the shopping list
    purchasedList.forEach((item,index) => {
        const itemPurchasedCard = `
        <div class="item">
            <div id="${index}">
                <p><strong><s>${item.name}</s></strong></p>
                <p><em><s>Kshs ${item.price}</s></em></p>
            </div>
            
            <div class="check">
                <label for="marked-${index}">Remove from purchased</label>
                <input 
                    type="checkbox" 
                    id="marked-${index}"
                    onclick="isPurchased(${index})"
                    checked
                >
            </div>
            <div>
                <div class="hiddenShown">
                   
                    <button 
                        id="delete-${index}"
                        class="shown"
                        onclick="deletePurchasedList(${index})"
                    >
                    Delete
                    </button>
                </div>
            </div>
         </div>`;

         clearAllButton(); //Toggles clear all button

         return hiddenPurchasedContainer.insertAdjacentHTML('beforeend', itemPurchasedCard);
    });
}

//displays items if any
displayShoppingItems();
displayPurchasedItems();

            /* CALCULATES TOTAL PRICES */
//For shopping LIst
const totalShoppingListPrice = (shoppingList) => {
    //finds the total price in the shopping list
    let shoppingTotal = shoppingList.reduce((total, oneItem) =>{ 
        // Changes price to float
        let price = parseFloat(oneItem.price)

        return total + price;        
        },0); 
    //targets and sets the p tag to calculated total price
    const calculatedTotal = document.getElementById('totalShoppingPrice');
    calculatedTotal.textContent = `Ksh ${shoppingTotal}`
}

//for purchased list
const totalPurchasedListPrice = (purchasedList) => {
    //finds the total price in the shopping list
    let purchasedTotal = purchasedList.reduce((total, oneItem) =>{ 
        // Changes price to float
        let price = parseFloat(oneItem.price)

        return total + price;        
        },0); 
    //targets and sets the p tag to calculated total price
    const calculatedTotal = document.getElementById('totalPurchasedPrice');
    calculatedTotal.textContent = `Ksh ${purchasedTotal}`
}

//for aggregate total
const totalAggregatePrice = (shoppingList, purchasedList ) => {
    //finds the total price in the shopping list
    let purchasedTotal = purchasedList.reduce((total, oneItem) =>{ 
        // Changes price to float
        let price = parseFloat(oneItem.price)

        return total + price;        
        },0); 
    let shoppingTotal = shoppingList.reduce((total, oneItem) =>{ 
        // Changes price to float
        price = parseFloat(oneItem.price)

        return total + price;        
        },0); 
    //Adds prices from the two list
    let aggregateTotal = shoppingTotal + purchasedTotal;
    //targets and sets the p tag to calculated total price
    const calculatedTotal = document.getElementById('aggregateTotalPrice');
    calculatedTotal.textContent = `Ksh ${aggregateTotal}`
}
//calculates the total
totalPurchasedListPrice(purchasedList);
totalShoppingListPrice(shoppingList);
totalAggregatePrice( shoppingList, purchasedList);


            /*3-DOT TOGGLING DELETE AND EDIT BUTTONS */

//function that toggles visibility of edit and delete buttons
const showMore = (index) => {
    const editButton = document.getElementById(`edit-${index}`);
    const deleteButton = document.getElementById(`delete-${index}`);  
    //in the purchased list, there is only the delete button to hide, thus the if statement
    if ( editButton && deleteButton ){
        editButton.classList.toggle('hidden');
        deleteButton.classList.toggle('hidden'); 
    } else if ( !editButton) {
        deleteButton.classList.toggle('hidden'); 
    }
}

            /*THE DELETING SECTION */

//Deleting Items in shopping List & Purchased List
const deleteShoppingList = ( index ) => {
    shoppingList.splice(index,1);

    saveToLocal();
    displayShoppingItems();
    clearAllButton();
    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
}
const deletePurchasedList = ( index ) => {
    purchasedList.splice(index,1);
    saveToLocal();
    displayPurchasedItems();
    clearAllButton();
    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
}

            /*THE EDITING SECTION */

//function that changes items from shopping lists to purchased list
const togglePurchased = (index) => {
    //removes items from the shopping list
    let purchasedItem = shoppingList.splice(index, 1)[0];
    purchasedList.push(purchasedItem)

    //calls display functions to update the DOM
    saveToLocal();
    displayShoppingItems();
    displayPurchasedItems();
    clearAllButton();

    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
}
//function that returns an item in purchased list back to shopping list
const isPurchased = (index) => {
    //removes items from the shopping list
    let unpurchasedItem = purchasedList.splice(index, 1)[0];
    shoppingList.push(unpurchasedItem)

    //calls display functions to update the DOM
    saveToLocal();
    displayShoppingItems();
    displayPurchasedItems();
    clearAllButton();

    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
}
//Function that reveals the edit tab
const editList = ( index ) =>{
    //targets popup container and toggle its visibility
    const editToShowPopup = document.getElementById(`popupContainer-${index}`);
    editToShowPopup.classList.toggle('popupHidden')
    //hide the initial edit button when the pop up is active
    if (editToShowPopup) {
        const hideInitialEdit = document.getElementById(`edit-${index}`)
        hideInitialEdit.classList.toggle('popupHidden')
    }
};

//function that closes the popup
const closePopup = (index) => {
    //targets popup container and toggle its visibility
    const editToShowPopup = document.getElementById(`popupContainer-${index}`);
    editToShowPopup.classList.toggle('popupHidden')
    //reveals the initial edit button after the pop up is closed
    if (editToShowPopup) {
        const hideInitialEdit = document.getElementById(`edit-${index}`)
        hideInitialEdit.classList.toggle('popupHidden')
    }
}

//function that edits
const editMethod = (index) => {
    const itemEdit = document.getElementById(`itemEdit-${index}`);
    const priceEdit = document.getElementById(`priceEdit-${index}`);

    // Targets the input value fields
    const newItem = itemEdit.value;
    const newPrice = priceEdit.value;

    //changes the list to the new items
    shoppingList[index].name = newItem;
    shoppingList[index].price = (parseFloat(newPrice)).toFixed(2);

    //Updates the DOM
    saveToLocal();
    displayShoppingItems();
    clearAllButton();

    //calculates the total
    totalPurchasedListPrice(purchasedList);
    totalShoppingListPrice(shoppingList);
    totalAggregatePrice( shoppingList, purchasedList);
}