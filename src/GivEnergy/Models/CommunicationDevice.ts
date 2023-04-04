import { Inverter } from "./Inverter"

export interface CommunicationDevice {
    serial_number: string
    type: string
    commision_date: Date
    inverter: Inverter
}