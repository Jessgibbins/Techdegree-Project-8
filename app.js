const ul = document.getElementById('employees'); 
const url = 'https://randomuser.me/api/?results=12';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let employees = data.results;
        return employees.map(function(employee) {
            let li = createNode('li'),
                img = createNode('img'),
                h2 = createNode('h2');
                a = createNode('a');
                p = createNode('p');
            li.classList.add('employee');
            img.src = employee.picture.medium;
            h2.innerHTML = `${employee.name.first} ${employee.name.last}`;
            a.innerHTML = `${employee.email}`;
            p.innerHTML = `${employee.location.city}`;
            append(li, img);
            append(li, h2);
            append(li, a);
            append(li, p);
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });