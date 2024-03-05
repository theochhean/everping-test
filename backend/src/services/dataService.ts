// dataService.ts
import fs from 'fs';
import path from 'path';
import { Device } from '../models/interfaces';

const filePath = path.resolve(__dirname, '../models/devices.json');

let devices: Device[] = [];

export const initializeData = (): void => {
    console.log('initializeData')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error while reading the file:', err);
          return;
        }
        try {
          const res: {devices: Device[]} = JSON.parse(data);
          devices = res.devices;
        } catch (err) {
          console.error('Error while parsing JSON data:', err);
        }
      });
};

export const getDevicesByClientId = (clientId: string): Device[] =>
  devices.filter((device) => device.clientId === clientId);

export const getClientIds = (): string[] => {
    const clientIdSet = new Set(devices.map((device) => device.clientId));
    const uniqueClientIdList = Array.from(clientIdSet);
    return uniqueClientIdList
};
