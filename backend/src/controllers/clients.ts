// clientsController.ts
import { Request, Response } from 'express';
import * as dataService from '../services/dataService'

export const getClientIds = (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify({ clientsIds: dataService.getClientIds() }))
};
