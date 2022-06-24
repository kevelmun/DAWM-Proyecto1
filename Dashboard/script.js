const url = "https://valorant-api.com/v1/weapons"

//let array = [];

var contenido = document.querySelector("#contenidoID");

function cargarDatos() {
    fetch(url)
  .then(response => response.json())
  .then(data => {
    
  
    //console.log(data);
    tabla(data);
   
  })
  .catch(err=>console.log(err));
}


function tabla(data) {

    
    contenido.innerHTML = ""
   
    for (let iterator of data["data"]) {
        
        contenido.innerHTML += `
        <tr>
                        <th scope="row">${iterator.displayName}</th>
                        <td>${iterator.shopData.category}</td>
                        <td>${iterator.shopData.cost}</td>
                        <td><img src="${iterator.displayIcon}"></td>
                      </tr>
        `
    }
       
    

}