import fetch from "node-fetch";
import { GivEnergyResponse } from "../Models/GivEnergyResponse"
import { CommunicationDevice } from "../Models/CommunicationDevice";
import { givEnergyRequest } from "./givEnergyRequest";
export async function getBatteryCapacity(): Promise<number> {
    const json = await givEnergyRequest<GivEnergyResponse<CommunicationDevice>>('GET', '/communication-device')
    const batteries = json.data[0].inverter.connections.batteries
    let capacity = 0
    batteries.forEach(battery => {
        const kwh = convertAmpsToKwh(battery.capacity.full)
        capacity += kwh
    });
    return capacity
}

function convertAmpsToKwh(capacity) {
    const batteryVoltage = 51.2
    return (batteryVoltage * capacity) / 1000
}