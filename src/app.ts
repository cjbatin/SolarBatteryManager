import { getBatteryCapacity } from "./GivEnergy/Services/getBatteryCapacity";
import { setBatteryACChargeLevel } from "./GivEnergy/Services/setBatteryACChargeLevel";
import { getSolcastRooftopSiteForecast } from "./Solcast/Services/getSolcastRooftopSiteForecast";

async function main() {
    if (process.env.IS_CI !== 'true') {
        require('dotenv').config();
      }
    const forecastKwh = await getSolcastRooftopSiteForecast()
    const batteryCapacityKwh = await getBatteryCapacity()

    console.log('Forecast: ' + forecastKwh)
    console.log('Battery Capacity ' + batteryCapacityKwh)

    const percentageChargeFromSolar = getPercentageChargeFromSolar(forecastKwh, batteryCapacityKwh)
    const percentageChargeRequired = 100 - percentageChargeFromSolar
    const minimumPercentageCharge = getMinimumPercentageCharge(batteryCapacityKwh)
    const percentageChargeToSet = percentageChargeRequired > minimumPercentageCharge ? percentageChargeRequired : minimumPercentageCharge
    const roundedUpPercentage = Math.ceil(percentageChargeToSet)
    await setBatteryACChargeLevel(roundedUpPercentage)
    console.log('Percentage charge to set' + roundedUpPercentage)
};

function getMinimumPercentageCharge(batteryCapacityKwh: number): number {
  const overnightUsageKwh: number = Number(process.env.MIN_KWH_CHARGE)
  return ((overnightUsageKwh / batteryCapacityKwh) * 100)
}

function getPercentageChargeFromSolar(forecastKwh: number, batteryCapacityKwh: number): number {
  const forecastTolerance: number = Number(process.env.FORECAST_TOLERANCE_PERCENTAGE)
  const adjustedForecast: number = forecastKwh - (forecastKwh * (forecastTolerance / 100))
  return ((adjustedForecast / batteryCapacityKwh) * 100 )
}

main()