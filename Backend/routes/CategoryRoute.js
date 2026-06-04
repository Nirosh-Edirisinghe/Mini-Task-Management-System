import express from 'express'
import { authorizeRoles, Authuser } from '../middleware/AuthMiddleware.js'
import { createCategory, getCategories } from '../controllers/CategoryController.js'

const categoryRouter = express.Router()

categoryRouter.post('/create', Authuser, authorizeRoles("ADMIN"), createCategory)
categoryRouter.get('/get-category', Authuser, getCategories)

export default categoryRouter;