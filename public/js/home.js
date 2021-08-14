async function getPosts() {
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // document.location.replace('/api/posts');
    console.log('Sucessfully retrieved posts');
  } else {
    console.log('Failed to retrieve posts');
  }
}

getPosts();
