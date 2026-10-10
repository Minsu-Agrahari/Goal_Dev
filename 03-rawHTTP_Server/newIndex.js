const express = requied('express');

//* Server Created
const app = express();

//* create middleware -- that reads the JSON file give by the use
app.use(express.json());

//* routes handling
app.get("/menu", (req, res) => res.json({
    item: ['thali', 'biryani'],
}))

app.post("/order", (req, res) => {
    res.status(200).json({
        status: "received",
        order: req.body
    })
});