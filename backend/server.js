const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const path = require('path');

// 让 dotenv 明确从 backend 目录加载（不受启动路径影响）
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    // 如果需要限制来源，换成你的前端地址，例如：
    // origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// --- MongoDB 连接：用你在 .env 里的 ATLAS_URI ---
const uri = process.env.ATLAS_URI;
if (!uri) {
    console.error('❌ ATLAS_URI not set. Put it in backend/.env');
    process.exit(1);
}

// 旧选项 useCreateIndex / useFindAndModify 已被废弃，别再传
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB database connection established successfully');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    // 出错直接退出，方便你看到问题；也可以改成重试逻辑
    process.exit(1);
});

// 路由
const bugsRouter = require('./routes/api/bugs');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');

app.use('/api/bugs', bugsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// 生产环境静态资源（后端托管前端 build）
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

// Socket.IO（如需跨域，指定 origin）
const io = socketIo(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    }
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
