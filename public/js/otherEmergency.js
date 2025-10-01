// Data de 60 emergencias sugeridas
const dataSuggest = {
  "landslide": "Deslizamiento de tierra",
  "tornado": "Tornado",
  "chemical_spill": "Derrame químico",
  "avalanche": "Avalancha",
  "hurricane": "Huracán",
  "tsunami": "Tsunami",
  "volcanic_eruption": "Erupción volcánica",
  "gas_leak": "Fuga de gas",
  "explosion": "Explosión",
  "building_collapse": "Colapso de edificio",
  "electrical_failure": "Fallo eléctrico",
  "heatwave": "Ola de calor",
  "drought": "Sequía",
  "blizzard": "Ventisca",
  "wildfire": "Incendio forestal",
  "industrial_accident": "Accidente industrial",
  "traffic_accident": "Accidente de tráfico",
  "train_derailment": "Descarrilamiento de tren",
  "plane_crash": "Accidente aéreo",
  "bridge_collapse": "Colapso de puente",
  "dam_failure": "Falla de represa",
  "radiation_leak": "Fuga radiactiva",
  "biological_hazard": "Peligro biológico",
  "power_outage": "Apagón eléctrico",
  "water_contamination": "Contaminación del agua",
  "structural_damage": "Daño estructural",
  "sinkhole": "Socavón",
  "storm": "Tormenta severa",
  "hailstorm": "Granizada",
  "lightning_strike": "Descarga eléctrica",
  "mudslide": "Deslizamiento de lodo",
  "flash_flood": "Inundación repentina",
  "frost": "Helada extrema",
  "pandemic": "Pandemia",
  "epidemic": "Epidemia",
  "food_poisoning": "Intoxicación alimentaria",
  "terrorism": "Acto terrorista",
  "civil_unrest": "Disturbios civiles",
  "hostage_situation": "Toma de rehenes",
  "armed_robbery": "Robo a mano armada",
  "kidnapping": "Secuestro",
  "cyberattack": "Ciberataque",
  "telecommunications_failure": "Falla de telecomunicaciones",
  "sewage_overflow": "Desbordamiento de alcantarillado",
  "oil_spill": "Derrame de petróleo",
  "air_pollution": "Contaminación del aire",
  "crowd_stampede": "Estampida humana",
  "elevator_malfunction": "Falla de ascensor",
  "crane_accident": "Accidente de grúa",
  "scaffolding_collapse": "Colapso de andamio",
  "mine_collapse": "Colapso de mina",
  "maritime_accident": "Accidente marítimo",
  "animal_attack": "Ataque de animal",
  "pest_infestation": "Infestación de plagas",
  "hazmat_incident": "Incidente de materiales peligrosos",
  "structural_fire": "Incendio estructural"
};

const searchCont = document.querySelector(".input-box");
const searchI = document.getElementById("searchI");
const suggestions = document.getElementById("suggestions");
const btnContinue = document.getElementById("btnContinue");

// Función para validar si la emergencia existe en dataSuggest
function isValidEmergency(value) {
  const emergencyValues = Object.values(dataSuggest);
  return emergencyValues.includes(value);
}

// Evento del botón "Continuar" con validación
btnContinue.addEventListener("click", (e) => {
  e.preventDefault()
  
  const emergencyValue = searchI.value.trim()
  
  // Validar que no esté vacío
  if (emergencyValue === "") {
    alert("Por favor, ingrese un tipo de emergencia...")
    searchI.focus()
    return
  }
  
  // Validar que sea una emergencia válida de la lista
  if (!isValidEmergency(emergencyValue)) {
    alert("Por favor, seleccione una emergencia válida de la lista de sugerencias...")
    searchI.focus()
    return
  }
  
  // Si pasa las validaciones, redirigir
  window.location.href = `name.html?emergency=${encodeURIComponent(emergencyValue)}`})

// También validar al presionar Enter
searchI.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btnContinue.click(); // Simular click en el botón para usar la misma validación
  }
})

searchI.addEventListener("keyup", (e) => {
  let dataS = e.target.value;
  let emptyA = [];
  
  if (dataS) {
    // Convierte el objeto a array de valores
    const emergencyValues = Object.values(dataSuggest);
    
    // Filtra las emergencias que coincidan
    emptyA = emergencyValues.filter((emergency) => {
      return emergency.toLowerCase().startsWith(dataS.toLowerCase());
    });

    // Mapea a los elementos li
    emptyA = emptyA.map((data) => {
      return `<li>${data}</li>`;
    });

    searchCont.classList.add("active");
    showSuggestions(emptyA);
    
    // Agrega evento click a cada sugerencia
    let allList = suggestions.querySelectorAll("li");
    for (let index = 0; index < allList.length; index++) {
      allList[index].setAttribute("onclick", "select(this)");
    }
  } else {
    searchCont.classList.remove("active");
  }
});

// Función para seleccionar sugerencia
function select(item) {
  let selectD = item.textContent;
  searchI.value = selectD;
  searchCont.classList.remove("active");
}

// Muestra las sugerencias
function showSuggestions(list) {
  let listD;
  if (!list.length) {
    userValue = searchI.value;
    listD = `<li>No hay coincidencias</li>`;
  } else {
    listD = list.join("");
  }
  suggestions.innerHTML = listD;
}