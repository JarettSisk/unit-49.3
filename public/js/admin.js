
// get all users
const getAllUsers = async () => {
  try {
    const res = await axios.get("/users");
    return res.data;
  } catch (error) {
    console.error(error)
  }
}


// dom function for creating user list item
const createUserDOM = async (id, email, firstName, lastName, state) => {
  
  const userLi = document.createElement('li');
  userLi.classList.add('user');
  userLi.setAttribute('id', id);

  const removeBtnForm = document.createElement('form');
  removeBtnForm.classList.add('remove-btn-form');
  removeBtnForm.setAttribute('method', 'POST');

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.innerText = 'Remove';
  removeBtn.setAttribute('type', 'submit');


  // Add listener to the new remove btn
  removeBtnForm.addEventListener("submit", async function(e) {
      e.preventDefault()
      await axios.delete(`/users/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      removeBtnForm.parentElement.remove();
    })
  
  let userP = document.createElement("p");
  userP.classList.add("userP");
  userP.innerText = `EMAIL: ${email} | FIRST NAME: ${firstName} | LAST NAME: ${lastName} | STATE: ${state}`

  userLi.append(userP);
  removeBtnForm.appendChild(removeBtn);
  userLi.append(removeBtnForm);

  return userLi;
}


// so now we need a function that gets the users, and then for each user, creates a new user and appends it to or userlist
const renderUsers = async () => {
  const allUsers = await getAllUsers();
  const userList = document.querySelector('.userList');

  if(!allUsers) {
    userList.innerHTML = "loading";
  } else {
    userList.innerHTML = "";
  }

  console.log(allUsers);
  allUsers.forEach(async (u) => {
    const userLi = await createUserDOM(u.id, u.email, u.firstName, u.lastName, u.state);
    userList.append(userLi);
  }) 
}

renderUsers();

