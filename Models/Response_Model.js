import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("response", responseSchema);
