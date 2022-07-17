
const url = "https://valorant-api.com/v1/weapons?language=es-ES";

let arrayArmas=[];
var weaponsNameContainer = document.getElementById("weaponsContainerID");
var weaponTitleContainer = document.getElementById("weaponTitleContainerID")

let weaponStatsCanvas = document.getElementById("weapon-stats").getContext("2d")

let weaponDataContainer = document.getElementById("weaponDataContainerID")

let arrayDamageHead = []
let arrayDamageBody = []
let arrayDamageLegs = []

let arrayDistancias = []


var chart;
function cargarNombres() {
    fetch(url)
    .then(response => response.json())
    .then(data =>{

        arrayArmas=data.data
        
       
        
     
        for (let i = 0; i < arrayArmas.length-1; i++) {
            
                let namesPlantilla2 = `<option class="text-center" value="${arrayArmas[i].displayName}">${arrayArmas[i].displayName}</option>`
                weaponsNameContainer.innerHTML+=namesPlantilla2
            
           
        }
        
        
        
    }).catch(err=>console.log(err));
}



const cargarWeaponData = async (nombre) => 
{
    weaponTitleContainer.innerHTML=nombre

    let selectedData = []

    let n=0;
    
    while(arrayArmas[n].displayName!=nombre){
        n++;
    }
    selectedData = arrayArmas[n]
    

    let dataPlantilla = `
                    <div class="row">
                        <div class="col-xl-9 text-center">
                            <div class="row">
                                <img class="w-75 mx-auto" src="${selectedData.displayIcon}" alt="displayIcon">
                            </div>
                            
                            <div class="row">
                                <h3>${selectedData.shopData.categoryText}</h3>
                                <h4>COSTO</h4>
                                <h5>${selectedData.shopData.cost}</h5>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <label><h6>Cadencia:</h6>  <p>${selectedData.weaponStats.fireRate} balas/s</p></label>
                                    </div>
                                    <div class="row">
                                        <label><h6>Cargador:</h6>  <p>${selectedData.weaponStats.magazineSize} balas</p></label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="row">
                                        <label><h6>Tiempo de equipamiento:</h6>  <p>${selectedData.weaponStats.equipTimeSeconds}s</p></label>
                                    </div>
                                    <div class="row">
                                        <label><h6> Tiempo de recarga:</h6> <p>${selectedData.weaponStats.reloadTimeSeconds}s</p></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3">
                            <div class="row align-items-center justify-content-between mb-4 text-center">
                                <h3 class="m-auto text-center">FALLO 1ª BALA</h3>
                                <div class="progress red m-auto text-center my-5">
                                    <span class="progress-left m-auto text-center ">
                                                    <span class="progress-bar"></span>
                                    </span>
                                    <span class="progress-right m-auto text-center ">
                                                    <span class="progress-bar m-auto text-center "></span>
                                    </span>
                                    <div class="progress-value m-auto text-center ">${selectedData.weaponStats.firstBulletAccuracy}%</div>
                                </div>
                            </div>
                        </div>
                    
                    </div>`

        
    weaponDataContainer.innerHTML=dataPlantilla




}


const cargarWeaponDamageCanva  = async(nombre) =>{
    let selectedData = []
    dataWeaponDamageCanvas = {}
    let n=0;
    
    while(arrayArmas[n].displayName!=nombre){
        n++;
    }
    selectedData = arrayArmas[n]


    cargarDamage(selectedData)
    
    if (chart) {
        chart.destroy()
    }
    dataWeaponDamageCanvas =  {
        type: "bar",
        data: {
            labels: arrayDistancias,
            datasets: [{
                label: "CABEZA",
                data: arrayDamageHead,
                backgroundColor: "rgba(235, 22, 22, .7)",
                fill: true
            },
            {
                label: "TORSO",
                data: arrayDamageBody,
                backgroundColor: "rgba(235, 22, 22, .5)",
                fill: true
            },
            {
                label: "PIERNAS",
                data: arrayDamageLegs,
                backgroundColor: "rgba(235, 22, 22, .3)",
                fill: true
            }
        ]
            },
        options: {
            responsive: true
        }
    };

    chart = new Chart(weaponStatsCanvas, dataWeaponDamageCanvas)


}


function cargarDamage(array) {

    arrayDistancias = []
    arrayDamageHead = []
    arrayDamageBody = []
    arrayDamageLegs = []
    for (let iterator of array.weaponStats.damageRanges) {
        arrayDistancias.push(iterator.rangeEndMeters)
        arrayDamageHead.push(iterator.headDamage)
        arrayDamageBody.push(iterator.bodyDamage)
        arrayDamageLegs.push(iterator.legDamage)
       
    }
        console.log(arrayDistancias)
    
}

function cargarArmasDanos(nombre){

    /* arrayArmas.length - 1 porque el cuchillo "siempre ubicado al final no tiene stats"*/
    for (let i = 0; i < arrayArmas.length - 1; i++) {
        if (arrayArmas[i].displayName==nombre) {
            for (const j of arrayArmas[i].weaponStats.damageRanges) {
                if(arrayArmas[i].weaponStats.damageRanges.length==3){

                }
                arrayDamageHead.push(arrayArmas[i].weaponStats.damageRanges[j].headDamage)
                arrayDamageBody.push(arrayArmas[i].weaponStats.damageRanges[j].bodyDamage)
                arrayDamageLegs.push(arrayArmas[i].weaponStats.damageRanges[j].legDamage)
            }
        
        }
        
    } 
     
}
window.onload = function ()
{
    cargarNombres();
};

weaponsNameContainer.addEventListener( "change", (e) => {

    let nombre = e.target.options[e.target.selectedIndex].text;
    cargarWeaponData(nombre);
   
    cargarWeaponDamageCanva(nombre);

})