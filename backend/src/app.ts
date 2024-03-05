// server.ts
import express from 'express';
import cors from "cors"
import fs from 'fs';
import devicesRoutes from './routes/devices';
import clientsRoutes from './routes/clients';
import { Device } from './models/interfaces';
import * as dataService from './services/dataService'

const path = './models/devices.json';
let devices: Device[] = [];

dataService.initializeData(); 

const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
  }
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    setTimeout(next, 10);
  });
app.use('/devices', devicesRoutes);
app.use('/clients', clientsRoutes);

export default app