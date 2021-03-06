const logout = async () => {

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log( "You've succesfully logged out" );
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  // document.querySelector('#logout').addEventListener('click', logout);
  
  document.getElementById('logout').addEventListener('click', logout);