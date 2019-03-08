const express = require('express');
const router = express.Router();
const item = require('../models/item');
const user = require('../models/user');
const category = require('../models/category');

router.get('/', (req, res) => {
    item.getAllItems((err, items) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all items. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, items: items }, null, 2));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    category.getCategoryByName(req.body.category).then(category => {
        let newItem = new item({
            name: req.body.name,
            description: req.body.description,
            kind: req.body.kind,
            category: category,//await category.getCategoryByName(req.body.category),
            color: req.body.color,
            createTime: req.body.create_time,
            location: req.body.location,
            username: req.body.username
        });
        let username = req.body.username;
        newItem.save(err => {
            if (err) {
                console.error(err);
                res.json({ success: false, message: `Failed to create a new item. Error: ${err}. req: ${req}` });
            }
            else {
                user.addItemToUser(newItem, username, (err) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    else {
                        res.json({ success: true, message: "Added successfully." });
                    }
                })
            }
        });

    })
});

router.put('/:id', (req, res) => {
    item.findById({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json({ success: false, message: `Failed to find item to update. Error: ${err}` });
        }
        else {
            var cat = category.getCategoryByName(req.body.category);
            result.name = req.body.name;
            result.description = req.body.description;
            //result.category = cat;
            result.color = req.body.color;
            result.createTime = req.body.create_time;
            result.location = req.body.location;
            console.log(result);
            console.log(cat);
            result.save(err => {
                if (err) {
                    res.json({ success: false, message: `Failed to save updated item. Error: ${err}` });
                }
                else {
                    res.json({ success: true, message: "Item updated successfully." });
                }
            })
        }
    })
})

//TODO: valadition (?) - if the items belogns to the user
router.delete('/:id', (req, res) => {
    item.deleteOne({ _id: req.params.id }, err => {
        if (err)
            res.json({ success: false, message: `Failed to delete item. Error: ${err}` });
        else
            res.sendStatus(200);
    });
});

module.exports = router;