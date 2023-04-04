import { Forecast } from "../Models/Forecast";
import { RooftopSiteResponse } from "../Models/RooftopSiteResponse";
import { solcastRequest } from "./solcastRequest";

export async function getSolcastRooftopSiteForecast() {
    const response = await solcastRequest<RooftopSiteResponse>()
    let tomorrowsData = getTomorrowsData(response.forecasts);
    let allPVEstimates = getAllPVEstimate(tomorrowsData) //half hourly rate
    let convertedToKwh =  allPVEstimates / 2 //converts to kwh
    return convertedToKwh
}

function getTomorrowsData(forecasts: Forecast[]): Forecast[] {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getUTCDate() + 1);

    return forecasts.filter(forecast => {
        let forecastDate = new Date(forecast.period_end)
        forecastDate.setUTCMinutes(forecastDate.getUTCMinutes() - 1)
        return forecastDate.getUTCDate() == tomorrow.getUTCDate()
    })
}

function getAllPVEstimate(forecasts: Forecast[]): number {
    let total = 0;

    forecasts.forEach(forecast => {
        total += forecast.pv_estimate
    })
    return total
}