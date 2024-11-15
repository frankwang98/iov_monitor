const express = require('express'); 
const router = express.Router(); 

const ping = require('ping');
const os = require('os'); 
const { v4: uuidv4 } = require('uuid');
const { machineIdSync } = require('node-machine-id');

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

module.exports = router;