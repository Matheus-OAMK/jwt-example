const signupform = document.querySelector('#myForm');



const signUpUrl = 'http://localhost:3001/api/users/signup';



signupform.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');

  //Alert if username or password is empty
  if (!username || !password) {
    alert('Please enter both a username and password.');
    return;
  }


  const data = { username, password };

  try {
    const response = await fetch(signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
      alert('Signup successful!');
      // redirect to another page, display a message, etc.
      window.location.href = 'success.html'; // redirect to another page
    } else if (result.error.includes('duplicate key value violates unique constraint "users_username_key"')) {
      alert('Username is already in use. Please choose another username.');
    } else {
      alert(`Please try again. Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});