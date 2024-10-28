let souborMest = []; 
let zvoleneMesto = null;
let lonMesto = null;
let latMesto = null;
let souborPocasi = [];
let UdajeKPouziti = [];


// Načtení JSON souboru
fetch('dataMesta.json')
	.then(response => response.json())
	.then(jsonData => {
		souborMest = jsonData; 
	})
	.catch(error => console.error("Error loading JSON data:", error));


// Funkce pro zobrazení návrhů
function suggestions() {
	const input = document.getElementById("inputHledani").value.toLowerCase();
	const seznamNavrhu = document.getElementById("seznamNavrhu");

	// odstranění předchozích návrhů
	seznamNavrhu.innerHTML = "";

	if (input.length === 0) {
		return; 
	}

	// Filtrace dat
	const filtrovanaMesta = souborMest.filter(item => item.name.toLowerCase().startsWith(input));

	// Zobrazení možností
	filtrovanaMesta.slice(0, 5).forEach(item => {
		const vybraneMesto = document.createElement("div");

		// Zobrazení názvu
		vybraneMesto.innerText = `${item.name}`;

		// Akce při kliknutí na jednu z možností
		vybraneMesto.onclick = () => {
			document.getElementById("inputHledani").value = item.name;
			seznamNavrhu.innerHTML = "";
			//vytažení zeměpisné délky a šířky pro vyhledávání
			zvoleneMesto = item;
			lonMesto = zvoleneMesto.coord.lon;
			latMesto = zvoleneMesto.coord.lat;
			//alert("Jdu to zjistit");
			//komunikace s open weather map
			const ajax = new XMLHttpRequest();
			ajax.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat=" + `${latMesto}` + "&lon=" + `${lonMesto}` + "&appid=a3fb9c8752987389b5b0d227b425b800&units=metric");
			ajax.addEventListener("readystatechange", () => {
				if (ajax.readyState == 4) {
					const odpoved = ajax.responseText;
					souborPocasi = JSON.parse(odpoved);
					//zobrazení tabulky
					let tabulka =  document.getElementById("tabulka");
					tabulka.classList.add("zobrazit");

					//console.log(souborPocasi.list);
					const UdajeOPocasi = souborPocasi.list;
					// DATUM + TEPLOTY PRO JEDNOTLIVÉ DNY
					
					UdajeKPouziti.push(UdajeOPocasi[0]);
					UdajeKPouziti.push(UdajeOPocasi[8]);
					UdajeKPouziti.push(UdajeOPocasi[16]);
					UdajeKPouziti.push(UdajeOPocasi[24]);
					UdajeKPouziti.push(UdajeOPocasi[32]);
					//console.log(UdajeKPouziti);
					
					for (const udaj of UdajeKPouziti)
					{
						tabulka.innerHTML = `<tr><th>${udaj.dt_txt}</th><td>${udaj.main.temp}</td></tr>`;
						console.log(udaj.dt_txt);
						console.log(udaj.main.temp);
					}

					
				}
			});
			ajax.send();
		};

		seznamNavrhu.appendChild(vybraneMesto);
	});
}





