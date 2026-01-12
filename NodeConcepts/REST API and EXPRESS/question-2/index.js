
import express from "express";
import os from "os";
import dns from "dns";
import { readFileData } from "./read.js";

const app = express();
const PORT = 3000;

// Test Route 
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Read File Route 
app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileData();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//System Details Route 
app.get("/systemdetails", (req, res) => {
  const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);

  res.json({
    platform: os.platform(),
    totalMemory: `${totalMemory} GB`,
    freeMemory: `${freeMemory} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length 
  });
});


app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) {
      res.status(500).send("DNS lookup failed");
    } else {
      res.json({
        hostname: "masaischool.com",
        addresses
      });
    }
  });
});

// Server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
