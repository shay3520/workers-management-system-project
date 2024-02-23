import express from 'express'
import { registerUser, loginUser, getTotalAdmins } from '../controllers/userControllers'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/totalAdmins', getTotalAdmins)

export default router
