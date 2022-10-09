const { Router } = require('express');
const router = Router();
const { User } = require('../db')
const sha1 = require('sha1')
const jwt = require("jsonwebtoken")
const passport = require('passport')

router.get('/restricted', 
passport.authenticate("jwt", {session: false}), 
(req, res) => {
    res.send('secreto')
})

router.get('/', (req, res) => {
    res.send('Conexion exitosa')
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const userWithEmail = await User.findOne({where: {email} }).catch((err) => {
        console.log("Error " + err)
    });
    if(!userWithEmail)
        return res.json({ message: "Email or password does not match"})

    if(userWithEmail.password !== password)
        return res.json({ message: "Email or password does not match"})

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email, name:userWithEmail.name, image:userWithEmail.image, role:userWithEmail.role }, process.env.JWT_SECRET)  // 'ext' is expiration time
    res.json({user: userWithEmail, token: jwtToken})
})



module.exports = router;

