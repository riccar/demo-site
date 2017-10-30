import $ from 'jquery';

class Modal {
  constructor() {
    //Access the following elements through jquery class selector
    //Get in touch button
    this.openModalButton = $(".open-modal");
    //modal screen
    this.modal = $(".modal");
    //modal close X icon
    this.closeModalButton = $(".modal__close");
    //call the event function to be accessible on page load so it can be listen to the event immediately
    this.events();
  }  
  
  events() {
    //Open modal when clicking the open modal button event. Item is bound to the main class
    this.openModalButton.click(this.openModal.bind(this));
    //Close modal when clicking the X close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    //Close modal when ESC key is pressed

  }

  openModal() {
    //Add CSS class to show the modal
    this.modal.addClass("modal--is-visible");
    //Return false to avoid scrolling up when the open modal button with href="#" is clicked 
    return false;
  }

  
  closeModal() {
    //Remove CSS class to hide the modal
    this.modal.removeClass("modal--is-visible");
  }
}

export default Modal;