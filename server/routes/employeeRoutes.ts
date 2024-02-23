import express from 'express'
import { getTotalEmployees, getTotalSalary, getEmployees, deleteEmployee, addEmployee, updateEmployee } from '../controllers/employeeControllers'

const router = express.Router()

router.get('/totalEmployees', getTotalEmployees)
router.get('/totalSalary', getTotalSalary)
router.get('/table1', getEmployees)
router.get('/table2', getEmployees)
router.delete('/:employeeId', deleteEmployee)
router.post('/addEmployee', addEmployee)
router.put('/updateEmployee/:id', updateEmployee)

export default router
