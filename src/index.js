let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(toys => toys.forEach(renderToys))

  function renderToys(toy){
    const card = document.createElement("div")
    card.className = "card"
    const collection = document.querySelector("#toy-collection")
    collection.append(card)

    card.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" width="250" height="250"><p>${toy.likes} Likes</p><button class="like-btn">Like </button>`
    
  }
  
  form.addEventListener('submit',createNewToy)
  
  // function createNewToy(e){
  //   e.preventDefault()
    
  //   const toyData = {name: e.target[0].value, image: e.target[1].value}

  //   fetch(`http://localhost:3000/toys`,{
  //     method: 'POST',
  //     headers:{
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(toyData),
  //   })
  //   .then(response => response.json())
  //   .then(input => console.log(input))
  // }
  
});

// const data = { username: 'example' };

// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
