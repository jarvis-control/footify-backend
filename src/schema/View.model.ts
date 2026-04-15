import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup, // PRODUCT (in this case)
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: Schema.Types.ObjectId, // productId
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("View", viewSchema); // returns "ViewModel"
