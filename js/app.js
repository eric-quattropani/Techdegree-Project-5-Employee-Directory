const gallery = document.getElementById('gallery');
const apiUrl = 'https://randomuser.me/api/?results=12&nat=au' 

// Fetch request for 12 random people from Australia.
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        let person = data.results;
        generateGallery(person);
        modalClick(person);
    })
    
//Maps through the 12 fetched people and appends them in HTML.
function generateGallery(data) {
    const eachPerson = data.map(person => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${person.picture.large}" alt="person picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">
          ${person.name.first}
          ${person.name.last}
        </h3>
        <p class="card-text">
          ${person.email}
        </p>
        <p class="card-text cap">
          ${person.location.city}
          ${person.location.state}
        </p>
    </div>
    </div>`).join('');
    //Note: Found that using .map() appended commas between the gallery elements, failed for a while trying to fix it but then did a bit of googling an found that .join('') fixes the problem.
    gallery.insertAdjacentHTML('beforeend', eachPerson);
 }

// Modal Cards markup
function generateModalCard(person){
    let modalCard = `<div class="modal-container">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${person.picture.large}" alt="person picture">
                                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                                <p class="modal-text">${person.email}</p>
                                <p class="modal-text cap">${person.location.city}</p>
                                <hr>
                                <p class="modal-text">${person.phone}</p>
                                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                                <p class="modal-text">Birthday: ${person.dob.date.slice(5,7)}/${person.dob.date.slice(8,10)}/${person.dob.date.slice(0,4)}</p>
                            </div>
                        </div>
                    </div>`;
        // Note: Using the .slice() method required a bit of playing around and googling but got there in the end. 
        gallery.insertAdjacentHTML('beforeend', modalCard);

    // Variables for modal functionality.
    const modal = document.querySelector('.modal-container');
    const modalCloseButton = document.querySelector('.modal-close-btn');
        
    // Listens for click on person card to close.
    modalCloseButton.addEventListener('click',() => {
    modal.remove();        
    });
}

// Event listener for modal click.
function modalClick (data){ 
    const card = document.getElementsByClassName('card');
        for(let i = 0; i < data.length; i++){
            
            card[i].addEventListener('click', (e) => {  
                let current = data.indexOf(data[i]);
                generateModalCard(data[current]);  
                
        });
    }
}