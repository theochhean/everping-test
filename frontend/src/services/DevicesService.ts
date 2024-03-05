export default class DevicesService {
    static async getDevicesForClientId(id: String) {
        const res = await fetch(`/devices/${id}`, {method: "GET"})
        const devicesList = await res.json()
        return devicesList
    }
}