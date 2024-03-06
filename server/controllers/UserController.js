const { User } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
};