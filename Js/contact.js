//event listener for form submission
document.getElementById('contactform').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault(); //prevent default form submission
    //get form values
    var name = getValues('name');
    var email = getValues('email');
    var howDidYouHear = getValues('howDidYouHear');
    var contactNumber = getValues('contactNumber');
    var message = getValues('message');
console.log(name, email, howDidYouHear, contactNumber, message);    
}

function getValues(id) {
  return document.getElementById(id).value;
}
