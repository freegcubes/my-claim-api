const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

let claims = [];

app.get("/", (req, res) => {
    res.send("My API is working!");
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

app.post("/claim", (req, res) => {
    const { playerId, packageName } = req.body;

    if (!playerId || !packageName) {
        return res.status(400).json({
            success: false,
            message: "Missing information"
        });
    }

    claims.push({
        playerId,
        packageName,
        date: new Date().toLocaleString()
    });

    res.json({
        success: true,
        message: "Claim request received!"
    });
});

app.get("/admin/claims", (req, res) => {
    if (!process.env.ADMIN_KEY ||
        req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    res.json(claims);
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
