import { Battery } from "./Battery"

export interface Inverter {
    serial: string
    connections: InverterConnections
}


export interface InverterConnections {
    batteries: [Battery]
}
