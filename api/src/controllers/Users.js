const { Router } = require('express');
const router = Router();
const { User } = require('../db')
const sha1 = require('sha1')

router.get('/', (req, res) => {
    res.send('Conexion exitosa')
})

router.post('/', async (req, res) => {
 const {name, email, password, role} = req.body
 if(!name || !email || !password || !role){return res.status(401).send("Falta enviar datos obligatorios")}
 sha1(password)
 try {
    const newUser = User.create({
        name,
        email,
        pass,
        role,
    })
    res.send('Usuario creado exitosamente')
 } catch (error) {
    res.send(error)
 }
}
)

module.exports = router;

/* {
    "name":"pepe",
    "email":"email@gmail.com",
    "password":"1234",
    "role":"user"
} */