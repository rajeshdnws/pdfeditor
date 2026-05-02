// Mock database - replace with actual database calls
const users = [];
const pdfs = [];

const getAllUsers = async (req, res) => {
  try {
    // Return users without passwords
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json({
      message: 'Users retrieved successfully',
      users: safeUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = user;
    res.json({
      message: 'User retrieved successfully',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update allowed fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.role) user.role = req.body.role;

    const { password, ...safeUser } = user;
    res.json({
      message: 'User updated successfully',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPDFs = async (req, res) => {
  try {
    res.json({
      message: 'PDFs retrieved successfully',
      pdfs: pdfs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePDFAdmin = async (req, res) => {
  try {
    const index = pdfs.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    pdfs.splice(index, 1);
    res.json({ message: 'PDF deleted successfully by admin' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: users.length,
      totalPDFs: pdfs.length,
      adminCount: users.filter(u => u.role === 'admin').length,
      userCount: users.filter(u => u.role === 'user').length
    };

    res.json({
      message: 'Stats retrieved successfully',
      stats: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllPDFs,
  deletePDFAdmin,
  getStats
};
