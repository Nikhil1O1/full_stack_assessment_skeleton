const prisma = require('../models/prismaClient');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.findUsersByHome = async (req, res) => {
  const { homeId } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: {
        homes: {
          some: { home_id: parseInt(homeId) }
        }
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
