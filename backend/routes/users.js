var express = require('express');
var router = express.Router();
const userModel = require("../views/models/userModel");

/* GET USER DETAILS */
router.post("/getUserDetails", async (req, res) => {
  try {
    let { userId } = req.body;

    let user = await userModel.findOne({ _id: userId });

    if (user) {
      return res.json({
        success: true,
        message: "User details fetched successfully",
        user: user,
      });
    } else {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;