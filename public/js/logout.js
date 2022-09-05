const log = document.getElementById("log-out");
log.addEventListener("click", (evt) => {
  evt.preventDefault();
//   var formEmail = document.getElementById("email").value;
//   var formName = document.getElementById("name").value;
//   console.log(email);
  pe.setPerson({ email: "ignacio.jordan@infobip.com" })
  .then(() => pe.track('logout'))
  .then(() => pe.updatePerson({ firstName: "Ignacio", lastName : "Jordan"}))
  .then(() => pe.forgetPerson())
})