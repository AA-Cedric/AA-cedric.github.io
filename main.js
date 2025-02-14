// Fetch variables from config.js
const { legendUrls, Configurations } = window.config;

// Functie om een bounding box te maken op basis van RD-coördinaten en buffer
function createBBox(rd_x, rd_y, buffer) {
    const minX = rd_x - (buffer[0] / 2) / 0.2;
    const minY = rd_y - (buffer[1] / 2) / 0.2;
    const maxX = rd_x + (buffer[0] / 2) / 0.2;
    const maxY = rd_y + (buffer[1] / 2) / 0.2;
    console.log(`bbox: ${minX},${minY},${maxX},${maxY}`);

    if (minX === maxX || minY === maxY) {
        throw new Error(`Invalid bbox with zero width/height: ${minX},${minY},${maxX},${maxY}`);
    }

    return [minX, minY, maxX, maxY];
}

// Download BGT data functie
async function downloadBGT(minX, minY, maxX, maxY) {
    const url = 'https://api.pdok.nl/lv/bgt/download/v1_0/dataset';
    
    const body = {
        "featuretypes": ["gebouw", "wegdeel"], // Objecten die we willen ophalen
        "format": "gml", // Formaat (kan ook 'geojson' zijn)
        "geofilter": {
            "type": "Polygon",
            "coordinates": [[
                [minX, minY], // Linksonder
                [maxX, minY], // Rechtsonder
                [maxX, maxY], // Rechtsboven
                [minX, maxY], // Linksboven
                [minX, minY]  // Terug naar beginpunt
            ]]
        }
    };

    try {
        // Stap 1: Download aanvraag doen
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (!data.downloadUrl) {
            throw new Error("Geen download URL ontvangen");
        }

        console.log("Download URL:", data.downloadUrl);

        // Stap 2: Download bestand
        const fileResponse = await fetch(data.downloadUrl);
        const blob = await fileResponse.blob(); // Zet response om naar een bestand

        // Stap 3: Maak een download-link en klik erop
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "bgt_download.gml"; // Bestand opslaan met deze naam
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log('Download voltooid!');
    } catch (error) {
        console.error('Fout bij downloaden:', error);
    }
}

// Event listener voor de knop
document.getElementById("fetch").addEventListener("click", async () => {
    try {
        // RD-coördinaten en buffer instellen
        const rd_x = 182235;
        const rd_y = 579360;
        const buffer = [1920, 1080];

        // Bounding box genereren
        const [minX, minY, maxX, maxY] = createBBox(rd_x, rd_y, buffer);

        // Download functie aanroepen
        await downloadBGT(minX, minY, maxX, maxY);

        alert("BGT download succesvol!");
    } catch (error) {
        alert(`Fout: ${error.message}`);
        console.error(error);
    }
});
