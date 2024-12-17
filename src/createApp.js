const placeRoutes = require("./routes/placeRoutes");
const express = require("express");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/places", placeRoutes);
  return app;
};

module.exports = createApp;
