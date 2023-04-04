import { BatterSetResponse } from "../Models/BatterySetResponse";
import { GivEnergyResponse } from "../Models/GivEnergyResponse";
import { givEnergyRequest } from "./givEnergyRequest";

export async function setBatteryACChargeLevel(percentage: number) {
    const body = JSON.stringify({"value": percentage})
    const response = await givEnergyRequest<GivEnergyResponse<BatterSetResponse>>("POST", "/inverter/SA2226G098/settings/77/write", body)
    console.log(response);
}