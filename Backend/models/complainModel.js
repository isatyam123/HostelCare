const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Electricity",
        "Water",
        "Internet",
        "Furniture",
        "Mess",
        "Cleanliness",
        "Other",
      ],
      default: "Other",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    complaint: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);