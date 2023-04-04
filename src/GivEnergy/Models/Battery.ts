export interface Battery {
    serial: string
    firmware_version: string
    capacity: BatteryCapacity
    cell_count: number
    has_usb: boolean
}

export interface BatteryCapacity {
    full: number
    design: number
}