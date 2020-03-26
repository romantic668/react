const router = require('express').Router();
let Bug = require('../models/api/bug.model');

router.route('/').get((req, res) => {
    Bug.find()
        .sort({ deadline: 1 })
        .populate('username')
        .then(bugs => res.json(bugs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const username = req.body.username;
    const deadline = req.body.deadline;

    // const finished = req.body.finished;



    const newBug = new Bug({
        title,
        description,
        priority,
        username,
        deadline
        // finished,

    
    
    });
    
    newBug.save()
        .then(bugs => res.json(bugs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Bug.findById(req.params.id)
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Bug.findById(req.params.id)
        .then(bug =>{
            bug.title = req.body.title;
            bug.description = req.body.description;
            bug.priority = req.body.priority;
            bug.deadline = req.body.deadline;

            bug.save()
            .then(bug => res.json(bug))
            .catch(err => res.status(400).json('Error: ' + err));

            
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/finish/:id').put((req, res) => {
    Bug.findById(req.params.id)
        .then(bug =>{
            
            bug.finished = true;

            bug.save()
            .then(bug => res.json(bug))
            .catch(err => res.status(400).json('Error: ' + err));

            
        })
        .catch(err => res.status(400).json('Error: ' + err));

});





module.exports = router;