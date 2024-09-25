const Job = require("../models/Job.js");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id }).sort("-createdAt");
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({ _id: id, createdBy: req.user._id });
    if (!job) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No job with id : ${id}` });
      return;
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, createdBy: req.user._id });
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No job with id : ${id}` });
      return;
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });
    if (!job) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No job with id : ${id}` });
      return;
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
