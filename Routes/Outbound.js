import express from "express";
import responseSchema from "../Models/Response_Model.js";
import { cacheKeys } from "./Inbound.js";

const router = express.Router();

router.post("/outbound/sms", (req, res) => {
  let { from, to, text } = req.body;
  // (From) validation
  if (from) {
    if (from.toString().length < 6 || from.toString().length > 16) {
      res.status(400).json({
        message: "",
        error: "parameter 'from' is invalid",
      });
      return;
    }
  } else {
    res.status(400).json({
      message: "",
      error: "parameter 'from' is missing",
    });
    return;
  }

  // (To) validation

  if (to) {
    if (to.toString().length < 6 || to.toString().length > 16) {
      res.status(400).json({
        message: "",
        error: "parameter 'to' is invalid",
      });
      return;
    }
  } else {
    res.status(400).json({
      message: "",
      error: "parameter 'to' is missing",
    });
    return;
  }

  // (Text) validation
  if (text) {
    if (text.length < 1 || text.length > 120) {
      res.status(400).json({
        message: "",
        error: "parameter 'text' is invalid",
      });
      return;
    }
  } else {
    res.status(400).json({
      message: "",
      error: "parameter 'text' is missing",
    });
    return;
  }

  if (cacheKeys[from] == to) {
    res.status(406).json({
      message: "",
      error:
        "This response from " +
        from +
        " to " +
        to +
        " is blocked by STOP request",
    });
    return;
  }
  const newResponse = responseSchema({
    from: from,
    to: to,
    text: text.toString(),
  });

  newResponse.save((OutboundError) => {
    if (OutboundError) {
      res.status(500).json({
        message: "",
        error: "Unknown Failure!",
      });
      console.log(OutboundError);
    } else {
      res.status(201).json({
        message: "Outbound sms is ok!",
        error: "",
      });
    }
  });
});

export { router as OutboundRouter };
