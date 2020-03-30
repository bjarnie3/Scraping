"use strict";

var mongoose = require("mongoose");

var listingSchema = new mongoose.Schema({
  title: String,
  datePosted: Date,
  neighborhood: String,
  url: String,
  jobDescription: String,
  compensation: String
});
var Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;