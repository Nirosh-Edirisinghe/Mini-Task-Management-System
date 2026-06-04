import express from 'express'
import { authorizeRoles, Authuser } from '../middleware/AuthMiddleware.js'
import { createCategory } from '../controllers/CategoryController.js'

const categoryRouter = express.Router()

categoryRouter.post('/create', Authuser, authorizeRoles("ADMIN"), createCategory)

export default categoryRouter;