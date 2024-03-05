
interface Security {
    firewall: boolean;
    antivirus: boolean;
    encryption: boolean;
  }
  
  interface Device {
    id: string;
    clientId: string;
    manufacturer: string;
    model: string;
    serialNumber: string;
    cpu: string;
    ram: number;
    storage: number;
    hardwareId: string;
    security: Security;
    user: string;
    lastCheckInDate: number;
  }
  
  
  export { Device };
  