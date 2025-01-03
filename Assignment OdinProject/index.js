const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");
const postalCodeError = document.querySelector("#postal-code + span.error");
const countryError = document.querySelector("#country + span.error");
const country = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const password = document.getElementById("pass")
const passwordError = document.querySelector("#pass + span.error");


email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = ""; // Remove the message content
    emailError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showError();
    // prevent form submission
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  emailError.className = "error active";
}


function checkPostalCode() {
    // For each country, defines the pattern that the postal code has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };
  
    const countryValue = document.getElementById("country").value;

  
    // Build the constraint checker
    const constraint = new RegExp(constraints[countryValue][0], "");
    console.log(constraint);
  
    // Check it!
    if (constraint.test(postalCodeField.value)) {
      // The postal code follows the constraint, we use the ConstraintAPI to tell it
      postalCodeField.setCustomValidity("");
      postalCodeError.textContent = "Valid Postal Code"
    } else {
      // The postal code doesn't follow the constraint, we use the ConstraintAPI to
      // give a message about the format required for this country
      postalCodeError.textContent = constraints[countryValue][1];
    }
  }

  country.addEventListener("change", checkPostalCode)
  postalCodeField.addEventListener("input", checkPostalCode)

  function checkPassword(){
    if (password.validity.valid) {
        passwordError.textContent = ""; // Remove the message content
        passwordError.className = "error"; // Removes the `active` class
    } else {
        passwordError.textContent = "pw to short"
    }
  }

  password.addEventListener("input", checkPassword)