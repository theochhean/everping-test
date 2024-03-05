export default class ClientsService {
    static async getClientsIds() {
        const res = await fetch('/clients', {method: "GET"})
        const clientsList = await res.json()
        return clientsList
    }
}