/*
Handles feature section animations to reveal elements when the page is being scrolled
*/

import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {

  constructor(element, offset) {
    /*Access  elements with jquery*/
    /*itemsToReveal is a collection of items since feature-item class is used by more than one item*/
    this.itemsToReveal = element;//$(".feature-item, .testimonial");
    this.offsetPercentage = offset;
    /*Functions to be executed at page load*/
    this.hideInitially();
    this.createWaypoints();
  
  }
 
  /*Hide the items initially*/
  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  /*Create waypoints for each item*/
  createWaypoints() {
    //Create a variable to hold this pointer so it can be used within the waypoint creation
    var revealOnScroll = this;
    //Execute the following function for each element in itemsToReveal
    this.itemsToReveal.each(function() {
      //save this pointer so it can be used within the next object
      var currentItem = this;
      //creating a new waypoint object
      new Waypoint({
        //Set the watching element to the current item
        element: currentItem,
        //Function to execute when the trigger element is found
        handler: function() {
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: revealOnScroll.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;
