const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/Auth");

app.use(cors());
app.use(express.json());
app.use("/api/Auth", authRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
