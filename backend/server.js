const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const path = require('path');

// 明确从 backend/.env 读取
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

/* -------------------- CORS 配置 -------------------- */
// 从环境变量读取白名单，逗号分隔
const rawOrigins =
    process.env.CORS_ORIGINS ||
    'http://localhost:3000,https://bugtracker-livid.vercel.app';

const listFromEnv = rawOrigins
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

// 内置允许规则：localhost + 环境变量 + *.vercel.app 动态预览
const allowedOrigins = [
    ...listFromEnv,
    /\.vercel\.app$/i, // ✅ 允许所有 Vercel 预览域名
];

function isAllowed(origin) {
    return allowedOrigins.some(o =>
        o instanceof RegExp ? o.test(origin) : o === origin
    );
}

const corsOptions = {
    origin(origin, cb) {
        if (!origin) return cb(null, true); // 没有 origin（curl / healthcheck）放行
        if (isAllowed(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS: ' + origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
/* --------------------------------------------------- */

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

// 生产环境托管前端 build
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
        origin(origin, cb) {
            if (!origin) return cb(null, true);
            if (isAllowed(origin)) return cb(null, true);
            cb(new Error('Not allowed by CORS (socket): ' + origin));
        },
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
