
const url = "https://valorant-api.com/v1/agents?language=es-MX";

let arrayAgentes=[];
var namesContainer = document.getElementById("agentsContainerID");
var agenteTitleContainer = document.getElementById("agenteTitleContainerID")


let agentDataContainer = document.getElementById("agentDataContainerID")
function cargarNombres() {
    fetch(url)
    .then(response => response.json())
    .then(data =>{


        for (let n = 0; n < data.data.length; n++) {
            
            if (data.data[n].isPlayableCharacter==true) {
                arrayAgentes.push(data.data[n])
               
            }
            
        }
        
        
     
        for (let i = 0; i < arrayAgentes.length; i++) {
            
                let namesPlantilla2 = `<option class="text-center" value="${arrayAgentes[i].displayName}">${arrayAgentes[i].displayName}</option>`
                namesContainer.innerHTML+=namesPlantilla2
            
           
        }
        
        
        
    }).catch(err=>console.log(err));
}



const cargarAgentData = async (nombre) => 
{
    agenteTitleContainer.innerHTML=nombre

    let selectedData = []

    let n=0;
    
    while(arrayAgentes[n].displayName!=nombre){
        n++;
    }
    selectedData = arrayAgentes[n]
    

    let dataPlantilla = `<div class="row">
    <div class="col-xl-5 align-items-right">
        <div class="row">
            <img class="img-fluid w-100" src="${selectedData.fullPortraitV2}" alt="fullPortraitV2">
        </div>
        <div class="row">
            <audio id="backgroudMusic" controls autoplay>
                <source src="${selectedData.voiceLine.mediaList[0].wave}" type="audio/wav">
              </audio>
        </div>
    </div>
  
    <div class="col-xl-7">
        <div class="row ">
            <div class="col-xl-6 align-items-center justify-content-between mb-4">
                <h2>Descripcion</h2>
                <p>${selectedData.description}</p>
            </div>
  
            <div class="col-xl-6">
                <div class="row text-center ">
                    <h2>Role: ${selectedData.role.displayName}</h2>
                    
                    <img class="w-25 mx-auto" src="${selectedData.role.displayIcon}" alt="displayIcon">
                </div>
            </div>
        </div>
  
        <div class="row">
            <div class="row ">
                <h2>HABILIDADES</h2>
            </div>
            <div class="row my-5">
                <div class="col-3 text-center">
                    <h5>${selectedData.abilities[0].displayName}</h5>
                    <img class="img-fluid w-50" src="${selectedData.abilities[0].displayIcon}" alt="displayIcon">
                </div>
                <div class="col-3 text-center">
                    <h5>${selectedData.abilities[1].displayName}</h5>
                    <img class="img-fluid w-50" src="${selectedData.abilities[1].displayIcon}" alt="displayIcon">
                </div>
                <div class="col-3 text-center">
                    <h5>${selectedData.abilities[2].displayName}</h5>
                    <img class="img-fluid w-50" src="${selectedData.abilities[2].displayIcon}" alt="displayIcon">
                </div>
                <div class="col-3 text-center">
                    <h5>${selectedData.abilities[3].displayName}</h5>
                    <img class="img-fluid w-50" src="${selectedData.abilities[3].displayIcon}" alt="displayIcon">
                </div>
               
  
            </div>
           
            
        
        </div>
    </div>
  
  </div>`

        
    agentDataContainer.innerHTML=dataPlantilla




}


window.onload = function ()
{
    cargarNombres();
};

namesContainer.addEventListener( "change", (e) => {

    let nombre = e.target.options[e.target.selectedIndex].text;
    
    cargarAgentData(nombre);

})