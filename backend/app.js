const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/user', userRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
