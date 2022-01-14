

async function getPosts() {

  document.location.replace('/api/allPosts');
  // const response = await fetch('/api/allPosts', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // const data = await response.json();
  
  // console.log( 'data', data );

  // if (response.ok) {
  //   // document.location.replace('/posts');
  //   console.log('Sucessfully retrieved posts');
  // } else {
  //   console.log('Failed to retrieve posts');
  // }
}

getPosts();
