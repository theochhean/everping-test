import { Request, Response } from 'express';
import * as dataService from '../services/dataService'

export const getDevicesById = (req: Request, res: Response) => {
  const clientId = req.params.id;
  const clientDevices = dataService.getDevicesByClientId(clientId)
  res.status(200).send(JSON.stringify({ devices: clientDevices }))
};
