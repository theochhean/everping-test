import express from "express"
import * as DevicesController from "../controllers/devices"

const router = express.Router()

router.get("/:id", DevicesController.getDevicesById)

export default router