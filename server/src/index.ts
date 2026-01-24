import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import pool from './config/db';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import seoRoutes from './routes/seo.routes';

import enquiryRoutes from './routes/enquiry.routes';
import settingsRoutes from './routes/settings.routes';
import serviceRoutes from './routes/service.routes';
import resourceRoutes from './routes/resource.routes';
import complianceRoutes from './routes/compliance.routes';
import blogRoutes from './routes/blog.routes';
import testimonialRoutes from './routes/testimonial.routes';
import holidayRoutes from './routes/holiday.routes';
import labourLawRoutes from './routes/labourLaw.routes';
import uploadRoutes from './routes/upload.routes';
import path from 'path';
import initAdminDb from './config/initAdminDb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Rate Limiting for Login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 attempts
    message: { message: 'Too many login attempts, please try again after 15 minutes' }
});

// Middleware
const corsOptions = {
    origin: [
        'https://truscomp-frontend.vercel.app',
        'http://localhost:8080',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight
app.use(cookieParser());
app.use(express.json());

// Minimal root route for Vercel deployment verification
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Backend is running', status: 'ok' });
});

// Routes
app.use('/api/v1/auth', loginLimiter, authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/seo', seoRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/compliance', complianceRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/holidays', holidayRoutes);
app.use('/api/v1/labour-law-updates', labourLawRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Basic Health Check Route
app.get('/health', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'ok',
            message: 'Server and Database are healthy',
            timestamp: result.rows[0].now
        });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed'
        });
    }
});

// Detailed Database Health Check
app.get('/api/health/db', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW() as time, current_database() as db');
        res.json({
            status: 'ok',
            database: result.rows[0].db,
            serverTime: result.rows[0].time,
            poolConfig: {
                max: 5,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 10000
            }
        });
    } catch (err: any) {
        console.error('DB Health Check Failed:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: err.message
        });
    }
});

// Start Server
const startServer = async () => {
    // Initialize DB schema (add missing columns if needed)
    await initAdminDb();

    // Only listen if NOT in Vercel environment
    if (!process.env.VERCEL) {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
};

startServer();

export default app;
