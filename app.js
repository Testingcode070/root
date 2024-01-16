const Joi=require('joi');
const express=require('express');
const app=express();
const courses=[{id:1,name:"course1"}];
app.use(express.json());


app.get('/',(req,res)=>{
  res.setHeader('Content-type','application/xml')
  res.send(`<?xml version = "1.0" encoding = "UTF-8"?>
  <?xml-stylesheet type="text/css"?>
  <Order>
    <Id>14</Id>
    <Customer>Jason</Customer>
    <Price>29.00</Price>
  </Order>`);
})
app.get('/courses', (req,res)=>{
  res.send(courses);
})
app.get('/:id',(req,res)=>{
  const result=courses.find(c=>c.id==req.params.id);
  if(!result) res.status(404).send("No such course with provided id");
  res.send(result);
})
app.post('/addcourses',(req,res)=>{
  const schema=Joi.object({
    name: Joi.string().min(8).required()
  });
  const {error}=schema.validate(req.body);
  res.send(error.details[0].message);
  // const course={
  //   id:courses.length+1,
  //   name:req.body.name
  // }
  // courses.push(course);
  // res.send("ok");
})

app.listen(8080,()=>console.log("server started"));
