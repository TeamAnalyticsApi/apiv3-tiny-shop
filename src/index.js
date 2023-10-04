const express = require("express");
const app = express();

const port = process.env.NODE_ENV === "test" ? 8295 : 8294;

app.use("/carts", require("./routes/carts.route"));

app.use((err, req, res, next) => {
  console.error(err.message);
  return res.sendStatus(500);
});

const server = app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
  app.emit("appStarted");
});
process.on("SIGTERM", () => server.close(() => process.exit(0)));

module.exports = { app };
