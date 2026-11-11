const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("My API is working!");
});

app.post("/claim", (req, res) => {
    const { playerId, packageName } = req.body;

    res.json({
        success: true,
        message: "Claim request received!"
    });
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
