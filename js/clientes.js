
//Crio templete
const criaNovaLinha = (name, email, phone, id) =>{
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `
                <td class="td" data-td>${name}</td>
                <td  class="td">${email}</td>
                <td  class="td">${phone}</td>
                <td><button onclick="editar(${id})">Editar</button></td>
                <td><button onclick="deletar(${id})">Deletar</button></td>
               
                `
    linhaNovoCliente.innerHTML = conteudo   //atribuo as td a tr 
    return linhaNovoCliente
}

// reservo um lugar p/ o templete 
const tabela = document.querySelector('[data-tabela]')

const listaClientes = ()=>{
    return fetch(`http://localhost:3000/clientes`) // a fetch me retorna uma promisse
    .then( resposta =>{
        return resposta.json()    //a resposta por padrão é texto, então tranformo em objeto js
    })
}

// Passa os dados para o templete
listaClientes()
.then(data =>{
    data.forEach(elemento =>{
    //Atribuo o conteudo da tabela criada dentro da mminha tabela no lista-cliente.html
    tabela.appendChild(criaNovaLinha(elemento.name, elemento.email, elemento.phone, elemento.id))    
    })
})


const criaClient = ( name, email, phone, id) =>{
    const myid = id 
    console.log(myid);
    if(myid){
        return fetch(`http://localhost:3000/clientes/${myid}`,{
            method: 'PUT',
            headers:{
                // 'Accept': 'application/json',
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
        // console.log(name, email, phone)
        return fetch(`http://localhost:3000/clientes`,{
            method: 'POST',
            headers:{
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            })
        })

        .then( resposta=>{
            return resposta.body
        })
    }

   
}

const formulario = document.querySelector('[data-form]')
formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const name = evento.target.querySelector('[data-name]').value
    const email = evento.target.querySelector('[data-email]').value
    const phone = evento.target.querySelector('[data-phone]').value
    const id = evento.target.querySelector('[data-id]').value

    console.log(name)
    criaClient(name, email, phone, id )
})


// Deletar 
function deletar(id){
    return fetch(`http://localhost:3000/clientes/${id}`,{
        method: 'DELETE' 
    })
}


function editar(id){
    fetch(`http://localhost:3000/clientes/${id}`,{
        method: "GET" 
    })

    .then( resposta=>{
        return resposta.json()
    })
    .then(data =>{
        console.log(data);
        document.getElementById("id").value = data.id
        document.getElementById("name").value = data.name
        document.getElementById("email").value = data.email
        document.getElementById("phone").value = data.phone
    })

    
    
    
    
    
    // consulta id
    // retorna obj dentro do form
    // condição adicionar or edit
     
    
}





































