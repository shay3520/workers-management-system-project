import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, required: true },
  address: { type: String, required: true },
  category: { type: String, required: false, enum: ['Development', 'IT', 'Designing', 'Management'] },
  image: { type: String, required: false }
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
