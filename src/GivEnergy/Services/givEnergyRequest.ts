export async function givEnergyRequest<T>(method: string, path: string, body?: BodyInit): Promise<T> {
    const apiKey = process.env.GIV_ENERGY_API_KEY
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: body
    };
    const url = "https://api.givenergy.cloud/v1" + path
    const response = await fetch(url, options)
    return await response.json() as T
}