// create variables for the document
var createboxButton = document.getElementById('create-box-button');
var createboxModal = document.getElementById('create-box-modal');
var modalBackdrop = document.getElementById('modal-backdrop');
var theHidden = document.getElementsByClassName('hidden');
var closeButton = document.querySelector('.modal-close-button');
var cancelButton = document.querySelector('.modal-cancel-button');
var acceptButton = document.querySelector('.modal-accept-button');


 // function to toggle the hidden class
 function toggleModal(){
  var textValue = document.getElementById('box-text-input');
  var attValue =  document.getElementById('box-attribution-input');
  textValue.value = '';
  attValue.value = '';

  modalBackdrop.classList.toggle('hidden');
  createboxModal.classList.toggle('hidden');
 }

// creates box and puts it in DOM
function makebox(content, attribution){
  var boxContainer = document.querySelector('.box-container');
  // clones the first box in the document
  var oldbox = document.querySelector('.box');
  var newbox = oldbox.cloneNode(true);
  // replaces the text part of the box with the user input
  var newboxText = newbox.querySelector('.box-text');
  var newText = document.createTextNode(content);
  newboxText.replaceChild(newText, newboxText.firstChild);
  // replaces the attribution part of the box with the user input
  var newboxAtt = newbox.querySelector('a');
  var newAtt = document.createTextNode(attribution);
  newboxAtt.replaceChild(newAtt, newboxAtt.firstChild);
  // puts new box into the box container
  boxContainer.appendChild(newbox);
}

function createbox(){
  var textValue = document.getElementById('box-text-input');
  var attValue =  document.getElementById('box-attribution-input');

  if(textValue.value.length === 0 || attValue.value.length === 0){
    alert('Text box and author box need to both have content in them before creating box');
    return;
  }
  // manageTextBox('box-text-input','box-attribution-input','yesclear','nosave');
  makebox(textValue.value,attValue.value);
  toggleModal();
}

// opens modal on click of box button
createboxButton.addEventListener('click',toggleModal);
// closes modal on click of close button
closeButton.addEventListener('click',toggleModal);
// closes modal on click of close button
cancelButton.addEventListener('click',toggleModal);
// on click of accept button: saves box and puts it into the DOM, and closes modal
acceptButton.addEventListener('click',createbox);


// for search box
var searchBox = document.getElementById('navbar-search-input');
var allBoxes = document.getElementsByClassName('box');
var boxContainer = document.querySelector('.box-container');
var searchButton = document.getElementById('navbar-search-button');

function searchFunction(){
  for(var k=0;k<allBoxes.length;k++){
    var text = allBoxes[k].querySelector('.box-text').textContent.toLowerCase();
    var attribute = allBoxes[k].querySelector('.box-attribution').textContent.toLowerCase();
    if(text.search(searchBox.value.toLowerCase()) != -1){
      allBoxes[k].classList.remove('hidden');
    }
    else if(attribute.search(searchBox.value.toLowerCase()) != -1){
      allBoxes[k].classList.remove('hidden');
    }
    else {
      allBoxes[k].classList.add('hidden');
    }
  }
}

searchBox.addEventListener('input',searchFunction);
searchButton.addEventListener('click',searchFunction);
