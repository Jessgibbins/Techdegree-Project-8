// Variables

const employeeList = document.getElementById('employee-list'); 
const url = 'https://randomuser.me/api/?results=12';
const list = [];
let index = 0;
const modal = document.createElement('div');
const closeBtn = document.createElement('span');
const modalContainer = document.createElement('div');

// Fetch Functions

fetch(url)
    .then(response => response.json())
    .then(data => {
        createEmployees(data.results);
    })

function createEmployees(data) {
    data.map(result => {
        const html = `
            <section class = 'employee-card' index = ${index}>
            <img class = 'employeeImage' src='${result.picture.large}' alt = 'profile-image'>
                <h3 class = 'employee-info'>${result.name.first} ${result.name.last}</h3>
                <p class = 'employee-info'>${result.email}</p>
                <p class = 'employee-info'>${result.location.city}</p>
            </section>
        `
        index++;
        list.push(result);
        employeeList.innerHTML += html;
    })
};

function createModalInfo(index) {
    const person = list[index];
    const birthday = new Date(person.dob.date).toLocaleString().split(',')[0];
    const html = `
      <div class = 'modalContent'>
        <img class ='modal-employeeImage' src='${person.picture.large}' alt = 'profile-image'>
        <div class ='modal-info'>
          <h3>${person.name.first} ${person.name.last}</h3>
          <p>${person.email}</p>
          <p>${person.location.city}</p>
          <hr>
          <p>${person.cell}</p>
          <p>${person.location.street.number} ${person.location.street.name} ${person.location.state} ${person.location.postcode}
          <p>Birthday: ${birthday}
        </div>
      </div>
    `
    employeeList.appendChild(modal);
    modal.className = 'modal';

    closeBtn.innerHTML = '&times';
    closeBtn.id = 'closeBtn';

    modalContainer.innerHTML = html;
    modalContainer.className = 'modal-container';

    modal.appendChild(modalContainer);
    modal.appendChild(closeBtn);
};
  
  
// Helper Functions

function getIndex(e) {
    if(e.target.className === 'employee-card') {
        return e.target.getAttribute('index');
    } else if (e.target.parentNode.className === 'employee-card') {
        return e.target.parentNode.getAttribute('index');
    }
}

function createModal(e) {
    const modal = document.querySelector('.modal');
    let personIndex = getIndex(e);
    createModalInfo(personIndex);
    return createModal;
}

function openModal() {
    modalContainer.style.display = 'block';
    closeBtn.style.display = 'block';
}


// Event Listeners

employeeList.addEventListener('click', (e) => {
    if (e.target.className === 'employee-card' || e.target.className === 'employeeImage' || e.target.className === 'employee-info') {
        createModal(e);
        openModal();
    }
});

closeBtn.addEventListener('click', function closeModal() {
    modalContainer.style.display = 'none';
    closeBtn.style.display = 'none';
});
