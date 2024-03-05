import express from "express"
import * as ClientsController from "../controllers/clients"

const router = express.Router()

router.get("/", ClientsController.getClientIds)

export default router