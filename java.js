let souborMest = [];
let zvoleneMesto = null;
let lonMesto = null;
let latMesto = null;
let souborPocasi = [];
let UdajeKPouziti = [];


// Načtení JSON souboru
fetch('city.list.json')
	.then(response => response.json())
	.then(jsonData => {
		souborMest = jsonData;
	})
	.catch(error => console.error("Error loading JSON data:", error));


// Funkce pro zobrazení návrhů
function naseptavac() {
	const input = document.getElementById("inputHledani").value.toLowerCase();
	const seznamNavrhu = document.getElementById("seznamNavrhu");

	// odstranění předchozích návrhů
	seznamNavrhu.innerHTML = "";

	if (input.length === 0) {
		return;
	}

	// Filtrace dat
	const filtrovanaMesta = souborMest.filter(item => item.name.toLowerCase().startsWith(input));

	// procházení pole 
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
			//vyčištění pole s údaji o počasí
			UdajeKPouziti = [];
			//komunikace s open weather map
			const ajax = new XMLHttpRequest();
			ajax.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat=" + `${latMesto}` + "&lon=" + `${lonMesto}` + "&appid=a3fb9c8752987389b5b0d227b425b800&units=metric");
			ajax.addEventListener("readystatechange", () => {
				if (ajax.readyState == 4) {
					const odpoved = ajax.responseText;
					souborPocasi = JSON.parse(odpoved);
					//zobrazení tabulky
					let tabulka = document.getElementById("tabulka");
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

					let uvnitrTabulky = "<tr> <th> Datum a čas </th> <th> Teplota </th> <tr> <tr>";
					UdajeKPouziti.forEach(udaj => {
						const datumTextovy = udaj.dt_txt;
						const [castDatum, castCas] = datumTextovy.split(' '); // Rozdělíme na datum a čas
						const [rok, mesic, den] = castDatum.split('-').map(Number); // Extrahujeme rok, měsíc, den
						const [hodiny, minuty, sekundy] = castCas.split(':').map(Number); // Extrahujeme hodiny, minuty, sekundy

						// Vytvoříme nový Date objekt
						const date = new Date(rok, mesic - 1, den, hodiny, minuty, sekundy); // Měsíc - 1, protože je indexován od 0

						// Formátování datum a času
						const datum = date.toLocaleDateString('cs-CZ');
						const cas = date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

						//console.log(`Datum: ${datum}, Čas: ${cas}`);						
						uvnitrTabulky += `<td> ${datum} ${cas}</td> <td> ${udaj.main.temp} °C </td>`;
						uvnitrTabulky += "</tr>";
					})

					tabulka.innerHTML = uvnitrTabulky;
				}
			});
			ajax.send();
		};

		seznamNavrhu.appendChild(vybraneMesto);
	});
}





