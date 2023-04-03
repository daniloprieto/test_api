const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.post('/', (req, res) => {
    const { limit } = req.query
    const users = [];

    for (let index = 0; index < (limit || 10) ; index++) {
        users.push({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
        });
        
    };

    res.json(users)});

router.post('/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        userId: id,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    });
})

module.exports = router;
