import express from 'express'
import { create, deleteItem, getAll, getById, update } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deleteItem)

export default router
