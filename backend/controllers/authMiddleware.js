import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Tokenni olish

    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRETni env faylidan oling
        req.userId = decoded.userId; // decoded malumotni reqga qo'shish
        next(); // Middleware davom ettirish
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};
