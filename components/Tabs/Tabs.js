class TabLink {  // 3. Our new class that will allow us to link the tabs with content items/cards via the data attribute. This class is all about linking the data together.

  constructor(tabElement){// 4. we pass in our iterations of our node list from the "new Tablink" below; it's all the tabs to select passed in as 'tabElement'

    // assign this.tabElement to the tabElement DOM reference
    this.tabElement = tabElement;// 5. each individual element (our tabs) can be separately referenced. (When we 'click' on one, the program will know which one)
    
    // Get the `data-tab` value from this.tabElement and store it here
    this.tabData = this.tabElement.dataset.tab;// 6. Our data attribute - it's value (this.data) will be what the data-tab value(name) of the tab/element we click on.
    
    // We need to find out if a user clicked 'all' cards or a specific category.  Follow the instructions below to accomplish this task:    

    //////////////////////////////////////////////////////////////////////// #7
    // Check to see if this.tabData is equal to 'all'
    if(this.tabData === 'all'){// 7. Declares a variable for content sections to be display/paired with their data buddies. Selecting the class of the element and passing 'data-tab${w/dynamic code} so the name value corresponds with the content to be selected. If all is selected then all cards are displayed.

      // If `all` is true, select all cards regardless of their data attribute values
      this.cards = document.querySelectorAll('.cards-container .card'); //returns all the cards with the all tab
    } else {
      // else if `all` is false, only select the cards with matching this.tabData values
      //The else selects the data tabs that match each other so the matching content is selected
      this.cards = document.querySelectorAll(`.cards-container .card[data-tab='${this.tabData}' ]`) ;
    }
    /////////////////////////////////////////////////////////////////////////////////////////

    // Map over the newly converted NodeList we just created in our if statement above. Convert each this.cards element into a new instance of the TabCard class. Pass in a card object to the TabCard class. 

    this.cards = Array.from(this.cards).map(card=>{// 8. create the content item variable (cards) and make a new class from it. Seems to contradict the process from earlier, but the class will be defined on the first compiler pass, and then created inside TabLink class on the second pass 
      return new TabCard(card);
    });

    // Add a click event that invokes this.selectTab
    this.tabElement.addEventListener('click',()=>{// 11. Adds eventListener to the TabLink for purpose of calling method on TabItem (changes class of content card to display block or none)
      this.selectTab() //invoking method to select tab on TabLink class
    });
  }

  selectTab(){  // 12. Event listener declared

    // Select all elements with the .tab class on them
    const tabs = document.querySelectorAll('.tabs .tab');// 13. Grabs all elements with class .tabs .tab as a node list. The things we'll click to change the content
    
    // Iterate through the NodeList removing the .active-tab class from each element
    tabs.forEach(tab=>{// 14. loops over the list and removes the class .active-tab from all items. Clean slate
      tab.classList.remove('active-tab');
    })

    // Select all of the elements with the .card class on them
    const cards = document.querySelectorAll('.cards-container .card');

    // Iterate through the NodeList setting the display style each one to 'none'
    cards.forEach(card=>{
      card.style.display = 'none' //15. select all the elements with .card class and Sets the display of all cards to none
    })
    
    // Add a class of ".active-tab" to this.tabElement
    this.tabElement.classList.add('active-tab');// 16. Calls the selectCard method on the content div associated with the tab that gets clicked and sets display to flex
  
    // Notice we are looping through the this.cards array and invoking selectCard() from the TabCard class. Just un-comment the code and study what is happening here.
    this.cards.forEach(card => card.selectCard()); //18 looping over this.cards array and calling the selectCard method to display flex so the cards that are selected show
  }
}

class TabCard {
  constructor(cardElement){// 9. passing in our cardElement variable from above - it's all of our card/tab-item divs from the html

    // Assign this.cardElement to the cardElement DOM reference
    this.cardElement = cardElement;// 10. Allows our card divs to be differentiated by the tab that gets clicked referencing its corresponding card/tab via our data attribute linking them both
  }

  selectCard(){// 17. Method for changing display of element to be displayed from none to flex
    // Update the style of this.cardElement to display = "flex"
    this.cardElement.style.display= 'flex' ;
  }
}

/* START HERE: 
- Select all classes named ".tab" and assign that value to the tabs variable
- With your selection in place, now chain a .forEach() method onto the tabs variable to iterate over the DOM NodeList
- In your .forEach() method's callback function, return a new instance of TabLink and pass in each tab as a parameter
*/
let tabs = document.querySelectorAll('.tabs .topics div').forEach(tab=>{
  new TabLink(tab); // 1. Grab the element to act as a selector tab/ pairs with element that displays content. Returns a node list.// 2. Iterate over the node list and pass each item of it into a "new" class TabLink. 
  //**This code must be at the bottom because creating a "new" class instance requires it to already be defined because Classes are not hoisted - See class at the top.**
});