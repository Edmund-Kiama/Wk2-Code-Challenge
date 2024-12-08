                /*VARIABLE INITIALIZATION */

//empty shopping list array or from local storage
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
let purchasedList = JSON.parse(localStorage.getItem('purchasedList')) || [];

//Variables
const form = document.getElementById('inputForm');
const hiddenShoppingContainer = document.querySelector('.hiddenShoppingContainer');
const hiddenPurchasedContainer = document.querySelector('.hiddenPurchasedContainer');

                /*LOCAL STORAGE SECTION */

//save to local storage
const saveToLocal = () => {
    localStorage.setItem('shoppingList',JSON.stringify(shoppingList));
    localStorage.setItem('purchasedList',JSON.stringify(purchasedList));
}

            /*CLEAR BUTTON SECTION */

//hides the clear all button
const clearAllButton = () => {
    const clearAllHide = document.getElementById("clearAll");
    if (shoppingList.length < 1 && purchasedList.length < 1 ) {
        clearAllHide.classList.add('hidden')
    } else {
        clearAllHide.classList.remove('hidden')
    }
}
clearAllButton();

//Clearing the whole List
const clearAll = () => {
    //resets all list back to empty lists
    shoppingList = [];
    purchasedList = [];

    //calls display functions to update the DOM
    saveToLocal();
    displayShoppingItems();
    displayPurchasedItems();
    clearAllButton();
};

            /*DATE SECTION */

//Gets todays date
const today = new Date();
const day = today.getDate();
let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
const month = monthNames[today.getMonth()];
const year = today.getFullYear();

            /*EVENT LISTENER */

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
                <p>${day} / ${month}/ ${year}</p>
                <label for="marked-${index}">Mark as purchased</label>
                <input 
                    type="checkbox" 
                    id="marked-${index}"
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
                <div class="popupHeader">
                    <p>Editing Item</p>
                    <button 
                        id="closePopup-${index}"
                        onclick="closePopup(${index})">
                            <img 
                                src="./images/close.png" 
                                alt="close"
                                width="3%"
                            >
                    </button>
                </div>

                <div id="popupId" >
                    <div id="editForm">
                        <p>Item:</p>
                        <input 
                            type="text"
                            placeholder='Enter new Item'
                            id="itemEdit-${index}"
                        >
                        <br>
                        <p>Price:</p>
                        <input 
                            type="number" 
                            placeholder='Enter new price'
                            id="priceEdit-${index}"
                        >
                        <br>
                        <button onclick='editMethod(${index})'>Edit</button>
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
                
                <button id="showMore" onclick="showMore(${index})" >
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
                <p><strong>${item.name}</strong></p>
                <p><em>Kshs ${item.price}</em></p>
            </div>
            
            <div class="check">
                <p>${day} / ${month}/ ${year}</p>
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
}
const deletePurchasedList = ( index ) => {
    purchasedList.splice(index,1);
    saveToLocal();
    displayPurchasedItems();
    clearAllButton();
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
}
//Function that reveals the edit tab
const editList = ( index ) =>{
    //targets popup container and toggle its visibility
    const editToShowPopup = document.getElementById(`popupContainer-${index}`);
    editToShowPopup.classList.toggle('popupHidden')
};

//function that closes the popup
const closePopup = (index) => {
    //targets popup container and toggle its visibility
    const editToShowPopup = document.getElementById(`popupContainer-${index}`);
    editToShowPopup.classList.toggle('popupHidden')
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
}