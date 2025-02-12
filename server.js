const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Inicializácia Firebase Admin SDK pomocou ENV variábla
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// API Endpoint na získanie Access Tokenu
app.get("/get-token", async (req, res) => {
    try {
        const token = await admin.credential.cert(serviceAccount).getAccessToken();
        res.json({ access_token: token.access_token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server beží na porte ${PORT}`));
