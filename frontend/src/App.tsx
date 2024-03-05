import React, { useEffect, useState } from 'react';
import './App.css';
import DevicesService from './services/DevicesService';
import ClientsService from './services/ClientsService';
import ClientsList from './components/ClientsList/ClientsList';
import DevicesTable from './components/DevicesTable/DevicesTable';
import Device from './interfaces/Device';

function App() {
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [clientsList, setClientsList] = useState<string[]>([])
  const [devicesList, setDevicesList] = useState<Device[]>([])

  useEffect(() => {
    ClientsService.getClientsIds().then(clientsList => {
      setClientsList(clientsList.clientsIds)
      if (clientsList.clientsIds.length > 0) setSelectedClient(clientsList.clientsIds[0])
    })
  }, [])
  useEffect(() => {
    if (selectedClient) {
      DevicesService.getDevicesForClientId(selectedClient).then((devicesList) => {
        setDevicesList(devicesList.devices)
      })
    }
  }, [selectedClient])

  return (
    <div className="App">
      <ClientsList clientsList={clientsList} setSelectedClient={setSelectedClient}/>
      <DevicesTable devicesList={devicesList} />
    </div>
  );
}

export default App;
