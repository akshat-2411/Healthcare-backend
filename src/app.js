require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.get('/', (req, res) => res.json({ message: 'Healthcare backend running' }));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // Sync - in production use migrations
    await sequelize.sync({ alter: true }); // alter syncs changes; use with caution in prod
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}
start();
