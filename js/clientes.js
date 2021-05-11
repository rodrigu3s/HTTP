
const createNewRow = (name, email, phone, id) =>{
    const clientNewRow = document.createElement('tr')
    const content = `
                <td class="td" data-td>${name}</td>
                <td  class="td">${email}</td>
                <td  class="td">${phone}</td>
                <td><button onclick="edit(${id})">Editar</button></td>
                <td><button onclick="deleteClient(${id})">Deletar</button></td>
               
                `
    clientNewRow.innerHTML = content   
    return clientNewRow
}
 
const tabela = document.querySelector('[data-table]')

const listClient = ()=>{
    return fetch(`http://localhost:3000/clientes`) 
    .then( response =>{
        return response.json()    
    })
}
listClient()
.then(data =>{
    data.forEach(elemento =>{
        tabela.appendChild(createNewRow(elemento.name, elemento.email, elemento.phone, elemento.id))    
    })
})

const createClient = ( name, email, phone, id) =>{
    const myid = id 
    if(myid){
        return fetch(`http://localhost:3000/clientes/${myid}`,{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                id: id
            })

        })
    }else{
        return fetch(`http://localhost:3000/clientes`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            })
        })

        .then( response=>{
            return response.body
        })
    }
}

const form = document.querySelector('[data-form]')
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const name = event.target.querySelector('[data-name]').value
    const email = event.target.querySelector('[data-email]').value
    const phone = event.target.querySelector('[data-phone]').value
    const id = event.target.querySelector('[data-id]').value

    createClient(name, email, phone, id )
})

 
function deleteClient(id){
    return fetch(`http://localhost:3000/clientes/${id}`,{
        method: 'DELETE' 
    })
}


function edit(id){
    fetch(`http://localhost:3000/clientes/${id}`,{
        method: "GET" 
    })

    .then( response=>{
        return response.json()
    })
    .then(data =>{
        document.getElementById("id").value = data.id
        document.getElementById("name").value = data.name
        document.getElementById("email").value = data.email
        document.getElementById("phone").value = data.phone
    })
}






































