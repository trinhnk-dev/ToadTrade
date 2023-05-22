const Nation = require('../models/Nation');
const Player = require('../models/Player');

const getNations = async (req, res, next) => {
  try {
    const allNations = await Nation.find();
    if (allNations.length === 0) {
      return res
        .status(200)
        .json({ status: 201, message: "Don't have Nation!" });
    }
    res.status(200).json(allNations);
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: 'Internal Server Error!' });
  }
};

const addNations = async (req, res, next) => {
  const newNations = new Nation(req.body);
  try {
    await newNations.save();
    return res.status(200).json({
      status: 200,
      message: 'Add Nations successfully!',
      nation: newNations,
    });
  } catch (e) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' });
  }
};

const editNations = async (req, res, next) => {
  const nationId = req.params.Id;
  try {
    await Nation.findOneAndUpdate({ _id: nationId }, req.body);
    return res
      .status(200)
      .json({ status: 200, message: 'Update Successfully!' });
  } catch (e) {
    return res
      .status(500)
      .json({ errorStatus: 500, errorMessage: 'Internal Server Error!' });
  }
};

const deleteNations = async (req, res, next) => {
  const nationId = req.params.Id;
  try {
    const checkExistUser = await Player.findOne({ nation: nationId });
    if (checkExistUser) {
      return res.json({ status: 400, message: 'Nation has User!' });
    }
    await Nation.findOneAndDelete({ _id: nationId });
    return res
      .status(200)
      .json({ status: 200, message: 'Deleted successfully!' });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: 'Internal Server Error!' });
  }
};

module.exports = {
  getNations,
  addNations,
  editNations,
  deleteNations,
};
