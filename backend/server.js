const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const path = require('path');

// 明确从 backend/.env 读取
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

/* -------------------- CORS 配置（关键） -------------------- */
// 允许的来源：用环境变量 CORS_ORIGINS 配置，逗号分隔。
// 本地开发和你的 Vercel 域名都要写进去。
const rawOrigins =
    process.env.CORS_ORIGINS ||
    'http://localhost:3000,https://https://bugtracker-livid.vercel.app/';
const allowedOrigins = rawOrigins
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, cb) {
        // 无 origin（如 curl / server-side）也放行
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400, // 预检缓存一天
};

app.use(cors(corsOptions));
// 显式处理预检
app.options('*', cors(corsOptions));

// 若你用到 secure cookie，Fly 反代下需要这行
app.set('trust proxy', 1);

app.use(express.json());
/* -------------------------------------------------------- */

// --- MongoDB 连接 ---
const uri = process.env.ATLAS_URI;
if (!uri) {
    console.error('❌ ATLAS_URI not set. Put it in backend/.env');
    process.exit(1);
}

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB database connection established successfully'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// 路由
const bugsRouter = require('./routes/api/bugs');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');

app.use('/api/bugs', bugsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// 生产环境托管前端 build（可选）
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../build');
    app.use('/', express.static(buildPath));
    app.get('*', (_req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// 启动 HTTP
const server = app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});

// Socket.IO，CORS 同步
const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', socket => {
    console.log('🔌 New client connected');

    socket.on('createBug', () => io.sockets.emit('createBug'));
    socket.on('finishBug', id => io.sockets.emit('finishBug', id));
    socket.on('editBug', bug => io.sockets.emit('editBug', bug));
    socket.on('deleteBug', id => io.sockets.emit('deleteBug', id));

    socket.on('disconnect', () => console.log('🔌 Client disconnected'));
});

// 优雅退出
['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, async () => {
        await mongoose.connection.close().catch(() => { });
        server.close(() => process.exit(0));
    });
});
