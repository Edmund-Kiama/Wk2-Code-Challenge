# Shopping List Application

This is shopping list application built with HTML, CSS and Vanilla JavaScript.
The web app allows users to manage their shopping list by adding items, specifying prices and viewing totals for both shopping and purchased lists.

## Features

The app provides an input field to add items and prices to the shopping list.
It display total price for:
--->Shopping list items.
--->Purchased items.
--->Aggregate total of all items.

The application is able to clear all items with a single button click.
It has a responsive and user-friendly interface.

## Table of Contents 

--->Installation
--->Usage
--->Features
--->Customization
--->License

## Installation

To get access to the codes, you could clone the repository or download the project files using:
--->git clone 
Navigate to the project folder and open the index.html file in your preferred browser.

## Usage

Open the application by running it through live server in VScode.
Enter an item name and its price in the respective fields.
In order to add the item to the shopping list click on the Add button.
The app provides a section for the total prices in the Total Shopping Price and Total Purchased Price.
Items on the shopping list can also be edited using the edit button.
Individual items can be deleted using their respective delete buttons.
A Clear All button is provided to reset the list and totals.

### File Details

HTML (index.html)---> Provides the structure for the shopping list application.
CSS (style.css) --->Styles the appearance of the application.
JavaScript (main.js) --->Implements the logic for adding, removing and calculating totals for items in the list.

## Features

Persistent Storage
---> Both the shopping and purchased list are initialized from localStorage.
---> saveToLocal() function synchronizes data between the DOM and localStorage whenever it is called.

Dynamic UI Updates
---> The displayShoppingItems and displayPurchasedItems functions dynamically update the DOM to reflect how the lists are shown in CSS.
---> UI components like Clear All button and price totals are toggled based on the state of the lists.

Price Calculations
---> There ae functions such as totalShoppingListPrice, totalPurchasedListPrice and totalAggregatePrice that calculates and updates their respective totals in the DOM.

Event Listeners
---> form.addEventListener('submit') ---> adds items to the shopping list.
---> clearList.addEventListener('click') ---> clears both lists.
---> onclick handlers in generated HTML manage interactivity for actions such as toggling if the items are purchased, editing items and deleting items.

Popup Editing
---> A popup form allows the users to edit item details, maintaining an organized UI.

Changes the dark and light mode
---> The user can change their modes from light to dark and vice versa.

## Customization

Styling---> You can modify the style.css file to customize the appearance.
Features--->You can update main.js to add new functionalities.

## License

This project is a free open resource.

