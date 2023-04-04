export async function solcastRequest<T>() {
    const apiKey = process.env.SOLCAST_API_KEY
    const siteId = process.env.SOLCAST_SITE_ID
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
    };
    const url = `https://api.solcast.com.au/rooftop_sites/${siteId}/forecasts?format=json`
    const response = await fetch(url, options)
    return await response.json() as T
}