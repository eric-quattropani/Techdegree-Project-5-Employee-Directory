const gallery = document.getElementById('gallery');
const apiUrl = 'https://randomuser.me/api/?results=12&nat=au' 

// Fetch request for 12 random people from Australia.
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        let profile = data.results;
        generateGallery(profile);
        modalClick(profile);
    })
    
//Maps through the 12 fetched people and appends them in HTML.
function generateGallery(data) {
    const eachPerson = data.map(person => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${person.picture.large}" alt="profile picture">
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
function generateModalCard(profile){
    let modalCard = `<div class="modal-container">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${profile.picture.large}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${profile.name.first} ${profile.name.last}</h3>
                                <p class="modal-text">${profile.email}</p>
                                <p class="modal-text cap">${profile.location.city}</p>
                                <hr>
                                <p class="modal-text">${profile.phone}</p>
                                <p class="modal-text">${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}</p>
                                <p class="modal-text">Birthday: ${profile.dob.date.slice(5,7)}/${profile.dob.date.slice(8,10)}/${profile.dob.date.slice(0,4)}</p>
                            </div>
                        </div>
                    </div>`;
        gallery.insertAdjacentHTML('beforeend', modalCard);

    // Variables for modal functionality.
    const modal = document.querySelector('.modal-container');
    const modalClose = document.querySelector('.modal-close-btn');
        
    // Listens for click on profile card to close.
    modalClose.addEventListener('click',() => {
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