window.onload = function() {
const url = "https://valorant-api.com/v1/bundles?language=es-ES"

const url2 = "https://valorant-api.com/v1/weapons/skins?language=es-ES"

let arrayPacks = []

let bannerContainer = document.getElementById("bannerContainerID")
let weaponTitleContainer = document.getElementById("weaponTitleContainerID")
let weaponDataContainer = document.getElementById("weaponDataContainerID");
function cargarPackBanners() {
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        for (let n = 0; n < data.data.length; n++) {
            
            if (data.data[n].displayName!="Orgullo") {
                arrayPacks.push(data.data[n])
               
            }
            
        }
        

         
        let bannerPlantillaFirst =   `
                                    <div class="carousel-item active" data-bs-interval="5000">
                                        <img src="${arrayPacks[0].displayIcon}" class="d-block w-100 myClickableThingy" alt="${arrayPacks[0].displayName}">
                                    </div>
                                `
        
        bannerContainer.innerHTML+=bannerPlantillaFirst
        for(let i=1; i<arrayPacks.length; i++){

            if (arrayPacks.length==i) {
                let bannerPlantillaLast =   `
        <div class="carousel-item">
        <img src="${arrayPacks[i].displayIcon}" class="d-block w-100 myClickableThingy" alt="${arrayPacks[i].displayName}">
        </div>
        `
            bannerContainer.innerHTML+=bannerPlantillaLast
            }
            
            let bannerPlantilla =   `
        <div class="carousel-item" data-bs-interval="5000">
        <img src="${arrayPacks[i].displayIcon}" class="d-block w-100 myClickableThingy" alt="${arrayPacks[i].displayName}">
        </div>
        `
        bannerContainer.innerHTML+=bannerPlantilla
        

        }
        



    }).catch(err=>console.log(err));

}





   
    cargarPackBanners();
    


    bannerContainer.addEventListener( "click", (e) => {

        let nombre = e.path[0].alt;
        
        cargarPackArmas(nombre);
    
    })

    const cargarPackArmas = async (nombre) => {
    weaponTitleContainer.innerHTML=nombre
    imagen = ""
    fetch(url2)
    .then(response => response.json())
    .then(data =>{
        weaponDataContainer.innerHTML="";
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].displayName.indexOf(nombre)>-1) {
                if (data.data[i].chromas[0].displayIcon==null) {
                    imagen = data.data[i].displayIcon
                }else{
                    imagen = data.data[i].chromas[0].displayIcon
                }
                

                

                let weaponSkinPlantilla = `
        <div class="col-sm-12 col-md-5 col-xl-auto text-center bg-secondary bg-gradient bg-opacity-10 rounded-3 mx-auto">
    
            <div class="row my-5">
                <h2>${data.data[i].displayName}</h2>
            </div>
            <div class="row">
                <img class="img-fluid w-100 mb-5" src="${imagen}" alt="${data.data[i].displayName}">
            </div>
    
        </div>`
            weaponDataContainer.innerHTML+= weaponSkinPlantilla;


                console.log(data.data[i].displayName)
                
            }
            
        }


    }).catch(err=>console.log(err));
  
   

}


};



   
  
