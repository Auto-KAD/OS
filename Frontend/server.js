const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Kernel Architecture Lab backend is running."
    });
});

app.listen(PORT, () => {
    console.log(`Kernel Architecture Lab server running at http://localhost:${PORT}`);
});