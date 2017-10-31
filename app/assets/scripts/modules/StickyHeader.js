/*Handle sticky header effects like changing background colour when scrolling down
 */

import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.lazyImages = $(".lazyload");
        //Select the site header object
        this.siteHeader = $(".site-header");
        //Select the trigger element to change background colour
        this.headerTriggerElement = $(".large-hero__title");
        //Call main function on object creation
        this.createHeaderWaypoint();
        //Select all the page section elements
        this.pageSection = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        //Create waypoints to highlight page sections links when scrolling
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }

    /*Refresh all the waypoints because waypoints calculated height needed to display elements is outdated after lazyload download the assets. All the waypoints are refreshed, even the ones within the RevealOnScroll.js. This is possible because Waypoints crete a global object called "waypoint" to the browser global window scope*/
    refreshWaypoints() {
        this.lazyImages.on('load', function() {
            Waypoint.refreshAll();
        });
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }

    //Create waypoint for the header menu
    createHeaderWaypoint() {
        //Save the StickyHeader pointer
        var stickyHeader = this;
        //Create a new waypoint object
        new Waypoint({
            //Select the watching element. Since waypoint expect a dom element, instead of a jquery object, we pass the first element of the jquery array object that always contain the dom element
            element: this.headerTriggerElement[0],
            //Function to execute when the trigger element is found
            handler: function (direction) {
                if (direction == 'down') {
                    stickyHeader.siteHeader.addClass("site-header--dark");
                } else {
                    stickyHeader.siteHeader.removeClass("site-header--dark");
                }

            }
        });
    }

    createPageSectionWaypoints() {
        //Save the StickyHeader pointer
        var stickyHeader = this; 
        //Execute the following function for each element in pageSection
        this.pageSection.each(function() {
            //save the object of this section before creating a new Waypoint
            var currentPageSection = this;
            //console.log(this);
            //Waypoint for scrolling direction = down with different offset
            new Waypoint({
                //Trigger element
                element: currentPageSection,
                //Function to execute when the trigger element is found
                handler: function (direction) {
                    if (direction == "down") {
                        //Select the element with the custom attribute defined in the page
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        //Remove highlight menu item for all sections
                        stickyHeader.headerLinks.removeClass("is-current-link");
                        //Highlight menu item of current section
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                    
                },
                //Make the highlight to happen 18% before the section reaches the top of the viewport
                offset: "18%"
            });

            //Waypoint for scrolling direction = up with different offset
            new Waypoint({
                //Trigger element
                element: currentPageSection,
                //Function to execute when the trigger element is found
                handler: function (direction) {
                    if (direction == "up") {
                        //Select the element with the custom attribute defined in the page
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        //Remove highlight menu item for all sections
                        stickyHeader.headerLinks.removeClass("is-current-link");
                        //Highlight menu item of current section
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                    
                },
                //Make the highlight to happen 18% before the section reaches the top of the viewport
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;