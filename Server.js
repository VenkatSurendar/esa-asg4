// Import
import express from "express";
import { InboundRouter } from "./Routes/Inbound.js";
import { OutboundRouter } from "./Routes/Outbound.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//Connection
const port = process.env.PORT || 5001;
const MongoDB_SRV = `mongodb+srv://ESA:WIU24AiNILd8tJm0@cluster0.dmpta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//WIU24AiNILd8tJm0
mongoose
  .connect(MongoDB_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database in cluster!"))
  .catch((err) => console.log(err));

//Middlewares

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(InboundRouter);
app.use(OutboundRouter);

//App Routes
app.get("/", (req, res) => {
  res.send("Welcome this is ESA assignment - 4");
});

app.all("*", async (req, res) => {
  res.status(405).json({
    message: "Method not allowed",
  });
});

// Listener
app.listen(port, () =>
  console.log(`Running on localhost: http://localhost:${port}`),
);
