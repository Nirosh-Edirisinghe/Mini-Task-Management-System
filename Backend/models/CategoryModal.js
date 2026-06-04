import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
)

const categoryModal = mongoose.model.category || mongoose.model('category', categorySchema)

export default categoryModal;