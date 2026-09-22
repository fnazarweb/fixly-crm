import express from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
