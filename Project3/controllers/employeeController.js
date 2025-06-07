const employeeModel = require('../models/employeeModel');

exports.getAllEmployees = (req,res) => {
    const employees = employeeModel.readEmployees();
    res.json(employees)
}
exports.getEmployeeById = (req, res) => {
  const employees = employeeModel.readEmployees();
  const employee = employees.find(e => e.id === req.params.id);
  if (!employee) return res.status(404).json({ message: 'Not found' });
  res.json(employee);
};
exports.createEmployee = (req, res) => {
  const employees = employeeModel.readEmployees();
  const newEmployee = { id: Date.now().toString(), ...req.body };
  employees.push(newEmployee);
  employeeModel.writeEmployees(employees);
  res.status(201).json(newEmployee);
};
exports.updateEmployee = (req, res) => {
  const employees = employeeModel.readEmployees();
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  employees[index] = { ...employees[index], ...req.body };
  employeeModel.writeEmployees(employees);
  res.json(employees[index]);
};
exports.deleteEmployee = (req, res) => {
  const employees = employeeModel.readEmployees();
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  const removed = employees.splice(index, 1);
  employeeModel.writeEmployees(employees);
  res.json(removed[0]);
};