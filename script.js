const uri = "https://jsonplaceholder.typicode.com/users/";
let tableBody = document.getElementById("tableBody");


//criar a div que terá o mapa
const divMap = document.querySelector("div");
divMap.id = "map";
divMap.style.height = "50em";
divMap.style.width = "100%";

let usersData = [];

async function getUsersData() {
  try {
    const response = await fetch(uri);
    const user = await response.json();
    usersData = user;
    renderTableRows(usersData);
  } catch (error) {
    console.error("Teve um erro!!", error);
  }
}

getUsersData();

filterInputName.addEventListener("keyup", filterRows);
//filterInputEmail.addEventListener('keyup', filterRows);

const renderTableRows = (data) => {
  let tableRows = "";


  data.forEach((user) => {
    user[
      "fulladdress"
    ] = `${user.address.street}, ${user.address.suite} - ${user.address.city}, ZIP: ${user.address.zipcode}  `;
  });

  //console.log("data:", data);
  data.forEach((user) => {
    tableRows += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.website}</td>
        <td>${user.address.geo.lat}, ${user.address.geo.lng}</td>
        <td>${user.fulladdress}</td>
        <td data-bs-toggle="tooltip" title="Ver no mapa">
          <img src="assets/map_512.png"
            height='25px' 
            alt="Map Icon"
            class="map-icon"
            onclick="showMap(${user.address.geo.lat}, ${user.address.geo.lng}, '${user.name}')"
          />
        </td>
      </tr>
    `;
  });


  tableBody.innerHTML = tableRows;
};

function filterRows() {
  const filterValueName = filterInputName.value.toLowerCase();

 const filteredData = usersData.filter((user) =>
    user.name.toLowerCase().includes(filterValueName) ||
    user.email.toLowerCase().includes(filterValueName) ||
    user.fulladdress.toLowerCase().includes(filterValueName) || // corrigido o nome da propriedade
    user.username.toLowerCase().includes(filterValueName) || 
    user.website.toLowerCase().includes(filterValueName)
  );

  console.log(filteredData);

  renderTableRows(filteredData);
}

// Initialize and add the map
let map;

async function initMap(lat, long, name) {
  const mainDiv = document.querySelector("#main");

  // The location of Uluru
  const position = { lat: parseFloat(lat), lng: parseFloat(long) };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  console.log(`geo:`, position);
  // The map, centered at Uluru
  map = new Map(mainDiv, {
    zoom: 5,
    center: position,
    mapId: "DEMO_MAP_ID",
    //mapTypeId: google.maps.MapTypeId.SATELLITE // Set map type to satellite
  });

  // The marker, positioned at Uluru
  new AdvancedMarkerElement({
    map: map,
    position: position,
    title: name,
  });

  mainDiv = mainDiv;
}

//initMap();
