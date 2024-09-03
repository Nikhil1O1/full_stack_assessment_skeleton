const prisma = require('../models/prismaClient');

exports.findHomesByUser = async (req, res) => {
  const { userId, page = 1, pageSize = 50 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const homes = await prisma.home.findMany({
      where: {
        users: { some: { user_id: parseInt(userId) } }
      },
      skip,
      take: parseInt(pageSize),
    });

    const totalHomes = await prisma.home.count({
      where: { users: { some: { user_id: parseInt(userId) } } }
    });

    res.json({
      homes,
      totalPages: Math.ceil(totalHomes / pageSize),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateHomeUsers = async (req, res) => {
  const { homeId, userIds } = req.body;
  

  if (!homeId || !Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    await prisma.user_home_relation.deleteMany({
      where: { home_id: parseInt(homeId) }
    });

    await prisma.user_home_relation.createMany({
      data: userIds.map(userId => ({
        home_id: parseInt(homeId),
        user_id: parseInt(userId)
      }))
    });

    const updatedHome = await prisma.home.findUnique({
      where: { id: parseInt(homeId) },
      include: { users: { include: { user: true } } }
    });

    res.json(updatedHome);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
