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
                span = createNode('span');
                a = createNode('a');
                p = createNode('p');
            img.src = employee.picture.medium;
            span.innerHTML = `${employee.name.first} ${employee.name.last}`;
            a.innerHTML = `${employee.email}`;
            p.innerHTML = `${employee.location.city}`;
            append(li, img);
            append(li, span);
            append(li, a);
            append(li, p);
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });