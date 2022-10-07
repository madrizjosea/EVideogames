const { Router } = require('express');
const router = Router();
const { User } = require('../db')
const sha1 = require('sha1')

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length) res.status(200).json(users);
        else res.status(404).send('No se encontraron users.');
    } catch (err) {
        console.log('GET USERS ERROR--->', err);
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const user = await User.findOne({
            where: { id: id },
        });
        if (user.length !== 0) {
            res.status(200).json(user);
        } else {
            res.status(400).send('not found');
        }
        res.status(200).json(user);
    } catch (err) {
        console.log('GET USER BY ID ERROR--->', err);
    }
})

router.post('/', async (req, res) => {
    const { name, email, password, role, image } = req.body
    if (!name || !email || !password || !role) { return res.status(401).send("Falta enviar datos obligatorios") }
    sha1(password)
    try {
        const foundMail = await User.findAll(
            {
                where: {
                    email: email
                }
            })
        if (foundMail.length > 0) {
            res.status(201).send('El email ya esta asociado a una cuenta existente')
        } else {
            User.create({
                name,
                email,
                password,
                role,
                image,
            })
            res.send('Usuario creado exitosamente')
        }
    } catch (error) {
        res.send('No se pudo crear el usuario')
    }
}
)

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        isActive
    } = req.body;
    try {
        const user = await User.findOne({
            where: { id: id }
        });
        user.set({
            isActive
        });
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.log('INACTIVE USER ERROR--->', err);
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        await User.destroy({
            where: { id: id }
        })
        res.status(200).send('User has been deleted');
    } catch (err) {
        console.log('DELETE USER BY ID ERROR--->', err);
    }
});

module.exports = router;

/* {
    "name":"pepe",
    "email":"email@gmail.com",
    "password":"1234",
    "role":"user"
} */

/* const foundMail = await User.findAll(
        {
            where :{
                email: email
                }})
    if(foundMail.length>0){
        res.send('foundMail')
    }else{  */