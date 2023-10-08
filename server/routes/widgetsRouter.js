const express = require('express');
const widgetsRouter = express.Router();
const Widget = require('../models/widget');

module.exports = widgetsRouter

//this stack is designed to interact with all widgets
//http://localhost:4000/widgets

widgetsRouter.route('/')
    .get((req, res) => {
        console.log("get method hit /widgets")
        Widget.find()
            .then((widgets) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(widgets);
            })
            .catch((error) => {
                res.statusCode = 500;
                res.send(error);
            })
    })
    .post((req, res) => {
        console.log("post method hit /widgets")
        Widget.create(req.body)
            .then((widget) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(widget);
            })
            .catch((error) => {
                res.statusCode = 503;
                res.send(error);
            })
    })

widgetsRouter.route('/:widgetId')
    .get((req, res) => {
        res.json(req.params)
    })

    .put((req, res, next) => {
        const id = req.params.widgetId
        Widget.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
            .then(widget => {
                res.json(widget);
            })
            .catch(err => next(err));
    })



//this stack is designed to interact with one widget at a given widget ID
//http://localhost:4000/widgets/4
//or http://localhost:4000/widgets/7 for example
//4 would come in as widgetId

