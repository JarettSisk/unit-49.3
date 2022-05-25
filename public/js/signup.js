
const signupForm = document.querySelector(".signup-form")
// handle for submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formValues = e.target.elements;
  try {
    const res = await axios.post("/users", {
      email: formValues.email.value,
      firstName: formValues.firstName.value,
      lastName: formValues.lastName.value
    });
    console.log(res);

    if(res.status === 200) {
      alert("Successfully registered");
      // reset the form if success
      signupForm.reset();
    }
  } catch (error) {
    alert("ERROR: " + error)
  }

})
