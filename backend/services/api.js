const express = require('express'); 
const router = express.Router(); 

const ping = require('ping');
const os = require('os'); 
const { v4: uuidv4 } = require('uuid');
const { machineIdSync } = require('node-machine-id');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// 示例用户列表（可以替换为数据库查询） 
const users = [ 
    { username: 'admin', password: '123' }, 
    { username: 'user2', password: 'password2' } 
];

router.get('/', (req, res) => {
    res.send('Hello IoT! Please use /ping to check the network status');
});
  
router.get('/ping', async (req, res) => {
    const ip = req.ip; // 获取请求的IP地址 
    const host = ip.replace('::ffff:', ''); // 处理IPv4-mapped IPv6地址 
    try { 
        const pingResult = await ping.promise.probe(host); 
        const responseTime = pingResult.time; 
        
        res.json({ 
        ip: host, 
        responseTime: responseTime, // 网络延迟时间
        alive: pingResult.alive // 是否在线 
        }); 
    } catch (error) { 
        res.status(500).json({ error: 'Ping failed', details: error }); 
    }
});

router.get('/uuid', (req, res) => {
    // 获取本机的MAC地址 
    const networkInterfaces = os.networkInterfaces(); 
    const macAddresses = Object.values(networkInterfaces) 
        .flat() 
        .filter(details => details.mac && details.mac !== '00:00:00:00:00:00') 
        .map(details => details.mac);

    // 使用MAC地址生成一个UUID - 变化
    // const uniqueIdentifier = macAddresses.length > 0 ? uuidv4(macAddresses[0]) : uuidv4

    // 获取设备的唯一标识符 - 不变
    const uniqueIdentifier = machineIdSync({ original: true });

    res.json({ 
        uuid: uniqueIdentifier, 
        macAddresses: macAddresses 
    });
});

// 登录接口 
router.post('/login', (req, res) => { 
    const { username, password } = req.body; 
    // 查找用户 
    const user = users.find(u => u.username === username && u.password === password); 
    if (user) { 
        res.json({ status: 'success', message: 'Login successful' }); 
    } else { 
        res.status(401).json({ status: 'error', message: 'Invalid username or password' }); 
    } 
});

// 模拟数据库中的数据
const iotData = [
  { value: "28.8", name: "温度" },
  { value: "34.7", name: "湿度" },
  { value: "79", name: "光照" },
  { value: "22", name: "空气质量" },
  { value: "57.6", name: "噪音" },
  { value: "36.6", name: "二氧化碳浓度" },
];

router.get('/IoTScreen/rightCenter', (req, res) => {
  res.json({
    success: true,
    data: iotData
  });
});

module.exports = router;