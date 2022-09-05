const form = document.getElementById("add-cart");
form.addEventListener("click", (evt) => {
  evt.preventDefault();
//   var formEmail = document.getElementById("email").value;
//   var formName = document.getElementById("name").value;
//   console.log(email);
  pe.setPerson({ email: "ignacio.jordan@infobip.com" })
  .then(() => pe.track('agregarCesto'))
  .then(() => pe.updatePerson({ firstName: "Ignacio", lastName: "Jordan"}))
})