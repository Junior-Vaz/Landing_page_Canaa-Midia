//Modulos
const express = require("express");
const app = express(); 
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require('./config/index')
const bodyParser = require("body-parser");


//carregandoi viwe engine
app.set('view engine','ejs');

//carregando arquivos estaticos
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));


//rotas

app.get("/", (req,res)=>{

    res.render('./index');

})

app.post("/send", (req,res)=>{

    let name = req.body.name;
    let fone = req.body.fone;
    let email = req.body.email;
    let text = req.body.text;

    if(email == '' && text == ''){
        console.log("email invalido")

        res.render('./index')
    }else{  
        
        const transporter = nodemailer.createTransport({
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: true,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass,  
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
        
        async function run(){
                const mailSent = await transporter.sendMail({
                subject: 'Quero saber mais!',
                //text: text,
                html: "<p>" + String(name) + "</p>" + "<p>" + String(text) + "</p>" + "<p>" + String('Contato: ' + fone) + "</p>",
                from: email,
                to: 'name <mysteriodesigner@gmail.com>'
                })
        
                console.log(mailSent)
        
        }
        
        run();

    }

    res.render('./index')
    

})





//Servidor
app.listen(4000, function(err){

    if(err){
    console.log("Ocorreu um erro")
    }else{
    console.log("Servidor rodando com sucesso!")
    }

})

