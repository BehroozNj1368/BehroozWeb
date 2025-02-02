const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// برای خواندن JSON از درخواست‌ها
app.use(express.json());

// متغیرهای ثابت برای تست (دمای 25 و رطوبت 60)
let sensorData = { temperature: 25, humidity: 60 };

// مسیر GET برای نمایش دما و رطوبت در مرورگر
app.get("/api/data", (req, res) => {
    res.json(sensorData);
});

// مسیر POST برای دریافت داده از ESP32
app.post("/api/data", (req, res) => {
    const { temperature, humidity } = req.body;

    // بررسی اینکه داده‌ها مقدار معتبر دارند
    if (temperature !== undefined && humidity !== undefined) {
        sensorData.temperature = temperature;
        sensorData.humidity = humidity;
        console.log("Received data:", sensorData);
        res.json({ success: true, message: "Data updated successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid data" });
    }
});

// مسیر اصلی برای تست سرور
app.get("/", (req, res) => {
    res.send("Hello from Replit!");
});

// اجرای سرور روی پورت مشخص شده
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
