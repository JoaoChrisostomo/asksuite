const express = require("express");
const router = express.Router();
const BrowserService = require("../services/BrowserService.js");

router.get("/", (req, res) => {
  res.send("Hello Asksuite World!");
});

router.post("/search", async (req, res) => {
  const { checkin, checkout } = req.body;

  try {
    const browserService = new BrowserService(checkin, checkout);
    const rooms = await browserService.getRooms();

    res.send(rooms);
  } catch (error) {
    res.status(400);
    res.send({ error: error.message.replace(/\s\s+/g, " ") });
  }
});

module.exports = router;