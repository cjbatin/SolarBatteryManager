# Solar Battery Manager

A simple solution to optimise your Givenergy battery imports from the grid when you have a cheap night time tariff and solar pv. This solution uses a hobbyist solcast api to predict the solar pv generation for the next day and sets the battery charge level to equate for this.

Example:
Given a 10Kwh battery.

* Solcast 5Kwh - Set battery to charge to 50%. 
* Solcast 20Kwh - Set battery to charge to 0%.

You can set a percentage tolerance for the forecast. This will adjust the forecast slightly. For example if you set it to 10% and the forecast is 10Kwh then the charge level will be set slightly higher to compensate for it.

You can set a rate for the amount of electricity you might use during the night. Between your off peak tariff ending and the sun generating more electricity than you use. This then becomes a minimum rate of charge. For example setting the rate to 2Kwh and you have a 10Kwh battery then you have a minimum charge rate of 20%.

## Getting Started

### Prerequisites
* An API key from solcast. You will need a hobbyist account and a site setup. [Get a key from here](https://solcast.com/free-rooftop-solar-forecasting)
* A Solcast Site ID
* An API key from [your givenergy dashboard](https://www.givenergy.cloud/)

### Setting Up

1. Fork the repository
2. Setup your secrets and variables using the below table.

| Key | value | Is Secret? |
| -------------- | ----------- | ----------- |
| GIV_ENERGY_API_KEY | Your givenergy api key | YES |
| SOLCAST_API_KEY | Your solcast api key | YES |
| SOLCAST_SITE_ID | Your solcast site id | YES |
| FORECAST_TOLERANCE_PERCENTAGE | A number that defines the tolerance to give to a forecast e.g `10` would reduce the forecast by 10%. | NO |
| MIN_KWH_CHARGE | A numbr that defines the minimum number of Kwh to charge the battery to from the grid e.g `2` would charge a 10Kwh battery to 10% | NO |

3. Edit the github workflow to run at a suitable time for you. Currently it is set to run every day at 20:00. You can alter the cron schedule to run at different times as suits.

```
on:
  workflow_dispatch:
  schedule:
    - cron:  '0 20 * * *'
```




