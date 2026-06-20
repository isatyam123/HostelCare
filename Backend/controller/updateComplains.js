const Complaint = require("../models/complainModel");

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      _id,
      { status: status },
      { new: true }
    );

    if (!complaint) {
      return res
        .status(404)
        .json({ status: false, msg: "Complaint not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Error updating complaint status",
      error: error.message,
    });
  }
};
