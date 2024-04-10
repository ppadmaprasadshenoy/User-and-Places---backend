
async function getCoordsForAddress() { 
    const lat = Math.random() * 90;

    const lng = (Math.random() * 360) - 180;

    return {
        lat: parseFloat(lat.toFixed(7)),
        lng: parseFloat(lng.toFixed(7))
    };
}

module.exports = getCoordsForAddress;
