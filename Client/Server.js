const express=require('express')
const app=express()

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/Anand', function(req, res){
   // res.setHeader('Content-Type', 'application/json');
            res.send(
              {
                firstName: "John",
                lastName: "Doe"
              }
            );
 });
 
 app.post('/Anandji', function(req, res){
  console.log(req.body)
});

 app.listen(3001,()=>{
   console.log('chal gya')
 });