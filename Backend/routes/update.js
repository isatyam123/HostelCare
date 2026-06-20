const express = require("express");
const router = express.Router();
const { updateComplaintStatus } = require("../controller/updateComplains");

router.put("/status", updateComplaintStatus);
router.get('/hello', (req, res) => {
    res.send('<p>hello</p>');
});
module.exports = router;
