/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', function(){
	var form = document.getElementById('signup');
	var usStatesSelect = form.elements['state'];
	var option;
	var state;
	for (var i = 0; i < usStates.length; i++) {
		option = document.createElement('option');
		state = usStates[i];
		option.value = state.code;
		option.innerHTML = state.name;
		usStatesSelect.appendChild(option);
	}

	var occupation = form.elements['occupation'];
	occupation.addEventListener('change', showOther);

	var cancelButton = document.getElementById('cancelButton');
	cancelButton.addEventListener('click', alert);



	form.addEventListener('submit', onSubmit);
});

// if show other is selected under occupation it creates a new input
function showOther() {
	var form = document.getElementById('signup');
	if (this.value == 'other') {
		form.elements['occupationOther'].style.display = 'block';
		
	} else {
		form.elements['occupationOther'].style.display = 'none';
	}
}

// alert message to see if they want to leave page
function alert() {
	if (window.confirm('Are you really sure you want to leave?')) {
		window.location = 'http://www.google.com';
	}
}

function onSubmit(evt) {
    var valid = validateForm(this);
    // Validating the date
    var dobField = this.elements['birthdate'];
    var dob = dobField.value;
    var age = calculateAge(dob);
    var dateValid = validateDate(age);
    var errMsg = document.getElementById('birthdateMessage');
   	if (!dateValid) {
   		errMsg.innerHTML = 'You are not 13 years old';
   		errMsg.style.display = 'block';
   		dobField.className = 'form-control invalid-field';
   } else if (valid) {
   		errMsg.style.display = 'none';
   		dobField.className = 'form-control';
   } else {
   		errMsg.style.display = 'none';
   }
   valid &= dateValid;


    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
} 

// calculates age
function calculateAge(dob) {
    dob = new Date(dob);
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }

    return yearsDiff; 
}

// validates required fields
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var valid = true;
    for (var i = 0; i < requiredFields.length; i++) {
        valid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    if (form.elements['occupation'].value == 'other') {
    	valid &= validateRequiredField(form.elements['occupationOther']);
    }

    return valid;
} 

// validates if other is selected
function validateOther(other) {
	var valid = true;
	valid = validateRequiredField(other);
	return valid;
}

// validates the fields and tests zip for 5 numbers
function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = value.length > 0;

    if (field.name == 'zip') {
    	valid &= zipRegExp.test(value);
    }

    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }

    return valid;
} 

// returns false if person is less than 13 years old
function validateDate(age) {
	var valid = true;
	if (age < 13) {
		valid = false;
	}
	return valid;
}