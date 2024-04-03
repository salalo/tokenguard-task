require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const externalApiUrl = process.env.EXTERNAL_API_URL;

app.use(cors({ origin: "*" }));
app.use(express.json());

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.post(`/chain-growth-data`, async (req, res) => {
  try {
    const { chain1, chain2 } = req.body;
    let response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chainName: chain1,
        period: "last year",
        metric: "tg_growth_index",
        compareWith: [chain2],
      }),
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.statusText}`);
    }

    const data = await response.json();
    // if cumulative is sum of chain1 and chain2 -> formatting here with substraction
    // substraction of blockchain from cumulative would result in negative values though
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
