let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const  toyCollection = document.querySelector('#toy-collection')
  
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
    card.dataset.id = toy.id
   
    
  }
  
  form.addEventListener('submit', createNewToy)
  
  function createNewToy(e){
    e.preventDefault()
    
    const toyData = {name: e.target[0].value, image: e.target[1].value}

    fetch(`http://localhost:3000/toys`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toyData),
    })
    .then(response => response.json())
    .then(input => renderToys(input))
    form.reset()
  }
  

toyCollection.addEventListener('click', updateLikes)
  
  function updateLikes(e){
    if (e.target.className === 'like-btn') {
      const card = e.target.closest('div.card')
      const likeTag = card.querySelector("p")
      const likes = parseInt(likeTag.textContent)
   

       fetch (`http://localhost:3000/toys/${card.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({likes: likes + 1})
      })
        .then(response => response.json())
        .then(data => {
          likeTag.textContent = `${data.likes} Likes`
        })
      
    }
     
 }
});
