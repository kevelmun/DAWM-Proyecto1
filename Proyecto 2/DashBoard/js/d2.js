
const urlArmas = "https://valorant-api.com/v1/weapons?language=es-ES"
const urlAgentes = "https://valorant-api.com/v1/agents?language=es-ES";





/* DOCUMENT ELEMENTS */
var encenderDashboar = document.getElementById("encenderDashboardID")


var mayorCargador = document.getElementById("mayorCargadorID")
var mayorVDisaparo = document.getElementById("mayorVDisaparoID")
var mayorDano = document.getElementById("mayorDanoID")
var mayorCosto = document.getElementById("mayorCostoID")


let weaponsDamageCanvas = document.getElementById("weapons-damages").getContext("2d")
let weaponsCostsCanvas = document.getElementById("weapons-costs").getContext("2d")
let weaponsFirstBulletMissCanvas = document.getElementById("weapons-miss").getContext("2d")
let agentsRolsCanvas = document.getElementById("agents-rols").getContext("2d")
/*ARRAYS GENERALES */
let arrayArmas = []
let arrayAgentes = []

/*ROLES DATA*/ 
let arrayRolesNames = []
let arrayCantidadAgentePorRol = []

/*ARMAS DATA*/
let arrayArmasNames = []
let arrayDamageHead = []
let arrayDamageBody = []
let arrayDamageLegs = []
let arrayArmasCosts = []
let arrayFirstBulletMiss = []

function cargarAgentes() {
   
    fetch(urlAgentes)
    .then(response => response.json())
    .then(data =>{
        for (let n = 0; n < data.data.length; n++) {    
            if (data.data[n].isPlayableCharacter==true) {
                arrayAgentes.push(data.data[n])
            }       
        }
    }).catch(err=>console.log(err));
}

function cargarArmas() {
   
    fetch(urlArmas)
    .then(response => response.json())
    .then(data =>{
        arrayArmas = data.data
    }).catch(err=>console.log(err));
}


function cargarRolesNames() {
    for (let i = 0; i < arrayAgentes.length; i++) {
        if (!arrayRolesNames.includes(arrayAgentes[i].role.displayName)) {
            arrayRolesNames.push(arrayAgentes[i].role.displayName)      
        }
    }
}

function cargarCantidadAngentexRoles() {

    for (let i = 0; i < arrayRolesNames.length; i++) {
       
        let contador = 0
        for (let j = 0; j < arrayAgentes.length; j++) {
            if (arrayRolesNames[i]==arrayAgentes[j].role.displayName) {
                contador++
            }
        }
        arrayCantidadAgentePorRol.push(contador)
    }
}


function cargarArmasNames(){

   /* arrayArmas.length - 1 porque el cuchillo "siempre ubicado al final no tiene stats"*/
    for (let i = 0; i < arrayArmas.length - 1; i++) {   
        arrayArmasNames.push(arrayArmas[i].displayName) 
        
    } 

}

function cargarArmasDanos(){

    /* arrayArmas.length - 1 porque el cuchillo "siempre ubicado al final no tiene stats"*/
    for (let i = 0; i < arrayArmas.length - 1; i++) {
        
        arrayDamageHead.push(arrayArmas[i].weaponStats.damageRanges[0].headDamage)
        arrayDamageBody.push(arrayArmas[i].weaponStats.damageRanges[0].bodyDamage)
        arrayDamageLegs.push(arrayArmas[i].weaponStats.damageRanges[0].legDamage)
    } 
     
}

function cargarArmasCosts(){

    /* arrayArmas.length - 1 porque el cuchillo "siempre ubicado al final no tiene stats"*/
    for (let i = 0; i < arrayArmas.length - 1; i++) {   
        arrayArmasCosts.push(arrayArmas[i].shopData.cost) 
        
    } 
 
 }

function cargarArmasFallo(){

    /* arrayArmas.length - 1 porque el cuchillo "siempre ubicado al final no tiene stats"*/
    for (let i = 0; i < arrayArmas.length - 1; i++) {   
        arrayFirstBulletMiss.push(arrayArmas[i].weaponStats.firstBulletAccuracy) 
        
    } 
 
}


const cargarGeneralData = async () => {
 
    dataCargarMayorCargador = cargarMayorCargador()
    dataCargarMayorVDisaparo = cargarMayorVDisaparo()
    dataCargarMayorCosto = cargarMayorCosto()
    dataCargarMayorDano = cargarMayorDano("cabeza")
    
    mayorCargador.innerHTML=` ${dataCargarMayorCargador[0]}: ${dataCargarMayorCargador[1]}`
    mayorVDisaparo.innerHTML=` ${dataCargarMayorVDisaparo[0]}: ${dataCargarMayorVDisaparo[1]}`
    mayorDano.innerHTML=` ${dataCargarMayorDano[0]}: ${dataCargarMayorDano[1]}`
    mayorCosto.innerHTML=` ${dataCargarMayorCosto[0]}: ${dataCargarMayorCosto[1]}`
}


function cargarMayorCargador(){
    var mayorCargadorName= "";
    var mayorCargadorData = 0;

    returnData = []
     /* arrayArmas.length-1 porque el cuchillo no tiene las mismas stats*/
    for (let i = 0; i < arrayArmas.length-1; i++) {
        if ( mayorCargadorData < arrayArmas[i].weaponStats.magazineSize) {
            mayorCargadorData = arrayArmas[i].weaponStats.magazineSize
            mayorCargadorName = arrayArmas[i].displayName
        }
        
    }

    returnData.push(mayorCargadorName)
    returnData.push(mayorCargadorData)

    return returnData
}

function cargarMayorVDisaparo(){
    var mayorVDisaparoName = "";
    var mayorVDisaparoData = 0;

    returnData = []
    for (let i = 0; i < arrayArmas.length-1; i++) {
        if ( mayorVDisaparoData < arrayArmas[i].weaponStats.fireRate) {
            mayorVDisaparoData = arrayArmas[i].weaponStats.fireRate
            mayorVDisaparoName = arrayArmas[i].displayName
        }
        
    }
    returnData.push(mayorVDisaparoName)
    returnData.push(mayorVDisaparoData)
    
    return returnData
}


function cargarMayorDano(d){
    var mayorDanoName = "";
    var mayorDanoData = 0;

    returnData = []
   
    if (d=="cabeza") {
        for (let i = 0; i < arrayArmas.length-1; i++) {
            if ( mayorDanoData < arrayArmas[i].weaponStats.damageRanges[0].headDamage) {
                mayorDanoData = arrayArmas[i].weaponStats.damageRanges[0].headDamage
                mayorDanoName = arrayArmas[i].displayName
            }
           
        }
    }
   
    if (d=="torso") {
        for (let i = 0; i < arrayArmas.length-1; i++) {
            if ( mayorDanoData < arrayArmas[i].weaponStats.damageRanges[0].bodyDamage) {
                mayorDanoData = arrayArmas[i].weaponStats.damageRanges[0].bodyDamage
                mayorDanoName = arrayArmas[i].displayName
            }
            
        }
    }

    if (d=="piernas") {
        for (let i = 0; i < arrayArmas.length-1; i++) {
            if ( mayorDanoData < arrayArmas[i].weaponStats.damageRanges[0].legDamage) {
                mayorDanoData = arrayArmas[i].weaponStats.damageRanges[0].legDamage
                mayorDanoName = arrayArmas[i].displayName
            }
            
        }
    }
    returnData.push(mayorDanoName)
    returnData.push(mayorDanoData)

    return returnData
}

function cargarMayorCosto(){
    
    var mayorCostoName = "";
    var mayorCostoData = 0;

    returnData = []


    for (let i = 0; i < arrayArmas.length-1; i++) {
        if ( mayorCostoData < arrayArmas[i].shopData.cost) {
            mayorCostoData = arrayArmas[i].shopData.cost
            mayorCostoName = arrayArmas[i].displayName
        }
        
    }
    returnData.push(mayorCostoName)
    returnData.push(mayorCostoData)

    return returnData
}


const cargaWeaponDamageCanva = async () => {
    dataWeaponsDamageCanvas = {}
    
    
    cargarArmasDanos()

    dataWeaponsDamageCanvas = {
        type: "bar",
            data: {
                labels: arrayArmasNames,
                datasets: [{
                        label: "CABEZA",
                        data: arrayDamageHead,
                        backgroundColor: "rgba(235, 22, 22, .7)"
                    },
                    {
                        label: "TORSO",
                        data: arrayDamageBody,
                        backgroundColor: "rgba(235, 22, 22, .5)"
                    },
                    {
                        label: "PIERNAS",
                        data: arrayDamageLegs,
                        backgroundColor: "rgba(235, 22, 22, .3)"
                    }
                ]
                },
            options: {
                responsive: true
            }
    }
    var chart = new Chart(weaponsDamageCanvas, dataWeaponsDamageCanvas)


    return chart
}

const cargaWeponCostsCanva = async () => {
    dataWeaponsCostsCanvas = {}
    
  
    cargarArmasCosts()

    dataWeaponsCostsCanvas =  {
        type: "line",
        data: {
            labels: arrayArmasNames,
            datasets: [{
                    label: "Costo",
                    data: arrayArmasCosts,
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: false
                }
            ]
            },
        options: {
            responsive: true
        }
    };

    var chart = new Chart(weaponsCostsCanvas, dataWeaponsCostsCanvas)


    return chart
}


const cargaWeaponsFirstBulletMissCanva = async () => {
    dataWeaponsFirstBulletMissCanvas = {}
    
    cargarArmasFallo()
    dataWeaponsFirstBulletMissCanvas =  {
        type: "line",
        data: {
            labels: arrayArmasNames,
            datasets: [{
                    label: "Fallo",
                    data: arrayFirstBulletMiss,
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    };

    var chart = new Chart(weaponsFirstBulletMissCanvas, dataWeaponsFirstBulletMissCanvas)


    return chart
}


const cargarAgentsRolsCanvas = async () => {
    dataAgentsRolsCanvas = {}
    
    cargarRolesNames()
    cargarCantidadAngentexRoles()
    dataAgentsRolsCanvas =  {
        type: "pie",
        data: {
            labels: arrayRolesNames,
            datasets: [{
                    label: "Agentes",
                    data: arrayCantidadAgentePorRol,
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    };

    var chart = new Chart(agentsRolsCanvas, dataAgentsRolsCanvas)


    return chart
}
window.onload = function(){

    cargarAgentes();

    cargarArmas();
}


encenderDashboar.addEventListener("click", (e) => {
    cargarArmasNames()
    cargarGeneralData()
    cargaWeaponDamageCanva()
    cargaWeponCostsCanva()
    cargaWeaponsFirstBulletMissCanva()
    cargarAgentsRolsCanvas()
})

    



