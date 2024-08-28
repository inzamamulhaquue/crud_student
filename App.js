const express = require('express');
const connectdb = require('./db');
const Student = require('./user');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
const Port = 2001;

connectdb();


//crete student
app.post('/api/student/new', async (req, res) =>{
    try{
    const student = await Student.create(req.body);
    res.status(201).json({message: "Created Successfully", student});
    }catch (err){
        res.status(400).json({ message: "Error creating student", err});
    }
});

//get student
app.get('/api/student', async (req,res) =>{
    try{
        const students = await Student.find();
        
        if(!students.lengrh === 0){
            return res.status(500).json({ message: "Student not found"});
        }
        res.status(200).json(students)
    }catch (err){
        res.status(400).json({ message: "Error", err});
    }
});

//update student
app.put('/api/student/:id', async(req, res) =>{
    try{
        let student = await Student.findById(req.params.id);

        if(!student){
            return res.status(500).json({ message: "Student not found"});
        }
        student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });         
        return res.status(200).json({message:"Student successfully Updated"});
    }catch (err){
        res.status(400).json({ message: "Error updating student", err});
    }
});

//delete student
app.delete('/api/student/:id', async(req, res) =>{
    try{
        let student = await Student.findById(req.params.id);        
        if(!student){
            return res.status(500).json({ message: "Student not found"});
        }
        await Student.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Student successfully deleted"});
    }catch (err){
        res.status(400).json({ message: "Error deleted student", err});
    }
});

app.listen(Port, () =>{
    console.log(`Server is working on ${Port}`);
});