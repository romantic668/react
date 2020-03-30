const router = require('express').Router();
let User = require('../../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;



    const newUser = new User({ username, password, email });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/bugs').post((req, res) => {
    const userId = req.params.id;
    const bugId = req.body.bugId;
    console.log(req.body)
    User.addBug(userId, bugId)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));;
});




module.exports = router;