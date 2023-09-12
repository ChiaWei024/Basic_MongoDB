// controller for emplooees API
const Employee = require("../model/Employee");

const { setDate } = require("date-fns");

// get
const getAllEmployees = async (req, res) => {
  const employee = await Employee.find({}).exec();
  if (!employee) return res.status(204).json({ message: "No employee found." });

  // if employee found
  return res.json(employee);
};

// post
const createNewEmplyees = async (req, res) => {
  //
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last name are required." });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// Update
const updateNewEmployees = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  //
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  //
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}!` });
  }

  // update if data is given
  if (req.body?.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body?.lastnamename) {
    employee.lastnamename = req.body.lastnamename;
  }

  //
  const result = await employee.save();
  return res.json(result);
};

// Delete
const deleteEmployees = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }
  // find who to delete
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  //
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}!` });
  }

  //
  const result = await employee.deleteOne({ _id: req.body.id });

  return res.json(result);
};

// get employee by id
const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }
  // find that employee
  const employee = await Employee.findOne({
    _id: req.params.id,
  }).exec();

  //
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}!` });
  }

  //
  return res.json(employee);
};

// export
module.exports = {
  getAllEmployees,
  createNewEmplyees,
  updateNewEmployees,
  deleteEmployees,
  getEmployee,
};
