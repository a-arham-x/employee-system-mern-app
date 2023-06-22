const express = require("express")
const router = express.Router()
const {body, validationResult} = require("express-validator")
const Employees = require("../models/Employees")

router.get("/", async (req, res)=>{
    const employees = await Employees.find().catch((err)=>{
        return res.json({fail: true});
    })
    return res.json(employees);
})

router.post("/add", [
    body("first_name").isLength({min:3}),
    body("last_name").isLength({min: 3}),
    body("email"),
    body("phone")
], async (req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.json({error, success: false, message: "One of the required fields id not correct"})
    }

    const newEmployee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }

    const employee = new Employees(newEmployee);

    await employee.save().then(()=>{
        return res.json({success: true, message: "Employee Successfully Registered"})
    }).catch((err)=>{
        console.log(err)
        return res.json({success: false, message: "Database Error"})
    })
})

router.delete("/delete", [
    body("id")
], async (req, res)=>{
    await Employees.findByIdAndDelete(req.body.id).then(()=>{
        return res.json({success: true})
    }).catch((err)=>{
        console.log(err);
        return res.json({success: false})
    })
})



module.exports = router;