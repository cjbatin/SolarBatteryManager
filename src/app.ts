import { getBatteryCapacity } from "./GivEnergy/Services/getBatteryCapacity";
import { setBatteryACChargeLevel } from "./GivEnergy/Services/setBatteryACChargeLevel";
import { getSolcastRooftopSiteForecast } from "./Solcast/Services/getSolcastRooftopSiteForecast";

async function main() {
    if (process.env.IS_CI !== 'true') {
        require('dotenv').config();
      }
    // const forecastKwh = await getSolcastRooftopSiteForecast()
    // const batteryCapacityKwh = await getBatteryCapacity()

    const forecastKwh = 13.458099999999998
    const batteryCapacityKwh = 9.233408
    console.log('Forecast: ' + forecastKwh)
    console.log('Battery Capacity ' + batteryCapacityKwh)

    const percentageChargeFromSolar = getPercentageChargeFromSolar(forecastKwh, batteryCapacityKwh)
    const percentageChargeRequired = getChargeRequired(percentageChargeFromSolar)
    const minimumPercentageCharge = getMinimumPercentageCharge(batteryCapacityKwh)
    const percentageChargeToSet = getPercentageChargeToSet(minimumPercentageCharge, percentageChargeRequired)
    await setBatteryACChargeLevel(percentageChargeToSet)
};

function getMinimumPercentageCharge(batteryCapacityKwh: number): number {
  const minKwhCharge: number = Number(process.env.MIN_KWH_CHARGE)
  const minCharge = ((minKwhCharge / batteryCapacityKwh) * 100)
  console.log('Min Charge ' + minCharge)
  return minCharge
}

function getPercentageChargeFromSolar(forecastKwh: number, batteryCapacityKwh: number): number {
  const forecastTolerance: number = Number(process.env.FORECAST_TOLERANCE_PERCENTAGE)
  const adjustedForecast: number = forecastKwh - (forecastKwh * (forecastTolerance / 100))
  const chargeFromSolar = ((adjustedForecast / batteryCapacityKwh) * 100 )
  console.log('Charge from solar ' + chargeFromSolar)
  return chargeFromSolar
}

function getChargeRequired(chargeFromSolar: number): number {
  const percentageChargeRequired = 100 - chargeFromSolar
  console.log('Charge required ' + percentageChargeRequired)
  return percentageChargeRequired
}

function getPercentageChargeToSet(minCharge: number, chargeRequired: number): number {
  const percentageChargeToSet = chargeRequired > minCharge ? chargeRequired : minCharge
  console.log("Charge to set " + percentageChargeToSet)
  const roundedUpPercentage = Math.ceil(percentageChargeToSet)
  console.log("Rounded up " + roundedUpPercentage)
  return roundedUpPercentage
}
main()