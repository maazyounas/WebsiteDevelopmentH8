var form = document.getElementById("userForm");
var maleBox = document.getElementById("male");
var femaleBox = document.getElementById("female");
var errorMsg = document.getElementById("errorMsg");
var output = document.getElementById("output");

maleBox.addEventListener("change", function () {
  if (maleBox.checked) {
    femaleBox.checked = false;
  }
});

femaleBox.addEventListener("change", function () {
  if (femaleBox.checked) {
    maleBox.checked = false;
  }
});

// Runs when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var age = document.getElementById("age").value.trim();
  var city = document.getElementById("city").value;
  var address = document.getElementById("address").value.trim();

  // Work out the gender and the message
  var gender = "";
  var message = "";

  if (maleBox.checked) {
    gender = "Male";
    message = "Go and earn";
  } else if (femaleBox.checked) {
    gender = "Female";
    message = "Go do tasks";
  }

  // Check that a gender was chosen
  if (gender === "") {
    errorMsg.textContent = "Please select your gender.";
    return;
  }

  errorMsg.textContent = "";

  // Show everything in the output area
  output.innerHTML =
    "<h2>Output</h2>" +
    "<p><strong>First Name:</strong> " + firstName + "</p>" +
    "<p><strong>Second Name:</strong> " + lastName + "</p>" +
    "<p><strong>Email:</strong> " + email + "</p>" +
    "<p><strong>Phone:</strong> " + phone + "</p>" +
    "<p><strong>Age:</strong> " + age + "</p>" +
    "<p><strong>Gender:</strong> " + gender + "</p>" +
    "<p><strong>City:</strong> " + city + "</p>" +
    "<p><strong>Address:</strong> " + address + "</p>" +
    "<p class='message'>" + message + "</p>";
});
