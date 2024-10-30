# pocasi
# Popis:
Jedná se o jednoduchou stránku s inputem, do kterého napíšete název města, zvolíte město z našeptávače a ukáže se jednoduchá tabulka předpovědi teploty na dalších 5 dní. Tabulka obsahuje datum, čas a teplotu. 
# Jak jednotlivé části funngují:
Počasí.html
Jednoduchý soubor s inputem, pro hledání města, pro které chceme předpovědět počasí.
JAVA.js
Našeprávač - Java soubor na začátku načte data ze souboru: city.list.json. Data si uloží do pole souborMest, ve kterém pak hledá hodnoty odpovídající vyhledávání. Hodnoty filtruje pomocí funkce filter, odpovídající hodnoty uloží do pole filtrovanaMesta. Poté projde jednotlivé hodnoty pomocí forEach a pro každou vytvoří div. Počet vypisovaných výsledků jsem omezila na 5, aby se pokaždé neobjevil “nekonečný“ výčet měst.
Dále sledujeme kliknutí na jedno z měst, po kliknutí se hodnota uloží do proměnné zvoleneMesto a vepíše se do inputu. Z pole měst z JSON souboru vytáhne hodnotu zeměpisné šířky a délky (lon a lat), tyto hodnoty pak slouží k vyhledání města v Open Wether Map. Na základě šířky a délky vyhledá počasí v daném městě a hodnotu si uloží do pole UdajeKPouziti, pole obsahuje každou osmou hodnotu z API, hodnoty jsou totiž v api po 3 hodinách. Rozhodla jsem se, že chci vypsat pouze počasí pro následujících 5 dní a to vždy ve stejný čas v čase hledání. 
Po té se projde pole UdajeKPouziti a z každého údaje se postupně pomocí ForEach vytáhne a vypíše datum, čas a teplota. Hodnoty se vypíší do tabulky, která, se po té zobrazí na stránce. 
