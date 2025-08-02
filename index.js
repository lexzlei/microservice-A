import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateSafetyTips from './geminiService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.post('/safety-tips', async (req, res) => { 
    try {
        const { location, startDate, endDate, numberOfTravelers } = req.body;
        const timestamp = new Date().toISOString();
        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }
        if (!numberOfTravelers || numberOfTravelers <= 0) {
            return res.status(400).json({ error: 'Number of travelers must be a positive integer' });
        }
        const tips = await generateSafetyTips({ location, startDate, endDate, numberOfTravelers, timestamp });
        res.json(tips);
    } catch (error) {
        console.error('Error generating safety tips:', error);
        res.status(500).json({ error: 'Failed to generate safety tips' });
    }
});

app.get('/', (req, res) => res.send("Server is running"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});