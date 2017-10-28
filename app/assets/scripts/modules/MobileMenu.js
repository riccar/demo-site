/*
Handles main menu animations to hide and show its content on small screens
by clicking when tapping the right-hand icon
*/

//Import jquery for easely access DOM
import $ from 'jquery';

class MobileMenu {
  constructor() {
    //Access menu elements with jquery
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    /*call the events() function at object construction to be available to the
    browser on page load*/
    // this.events();
  }

  //Declare the events for the different objects of the menu
  events() {
    /*Since this.toggleTheMenu is called on click, 'this' takes the context of
    the caller, the menu icon instead of the actual MobileMenu class
    bind is used to ensure 'this' keeps its reference to the MobileMenu class*/
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  //Declare the action once the element is clicked
  toggleTheMenu() {
    /*Toggle the following clases to the differnt menu items to change appearance
    Toggle function adds and remove the class without affecting original ones*/

    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
