const express = require("express");

const db = require("../data/dbConfig.js");

const app = express();

app.use(express.json());

app.get("/api/accounts", (req, res) => {
    db("accounts")
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log("accounts get error: ", err);
        res.status(500).json({
            message: "error getting accounts"
        });
    })
});
app.get("/api/accounts/:id", (req, res) => {
    const {id} = req.params;

    db("accounts").where({id})
    .then(account => {
        if(account){
            res.status(200).json(account);
        }
        else{
            res.status(404).json({
                message: "account not found"
            });
        }
    })
    .catch(err => {
        console.log("account create error: ", err);
        res.status(500).json({
            message: "error retrieving account"
        });
    });
});

app.post("/api/accounts", (req, res) => {
    db("accounts").insert(req.body)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => {
        console.log("create account error: ", err);
        res.status(500).json({
            message: "error creating account"
        });
    });
});

app.put("/api/accounts/:id", (req, res) => {
    const {id} = req.params;

    db("accounts").update(req.body).where({id})
    .then(account => {
        if(account){
            res.status(200).json(account);
        }
        else{
            res.status(404).json({
                message: "account not found"
            });
        }
        
    })
    .catch(err => {
        console.log("update account error: ", err);
        res.status(500).json({
            message: "error updating account"
        });
    });
});

app.delete("/api/accounts/:id", (req, res) => {
    const {id} = req.params;

    db("accounts").where({id}).del()
    .then(account => {
        if(account){
            res.status(200).json(account)
        }
        else{
            res.status(404).json({
                message: "account not found"
            })
        }
    })
    .catch(err => {
        console.log("account delete error: ", err);
        res.status(500).json({
            message: "error deleting account"
        });
    });
});

module.exports = app;
