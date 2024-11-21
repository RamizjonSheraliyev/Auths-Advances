import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.token;

  // If no token is found, respond with an error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - no token provided",
    });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token cannot be decoded or is invalid, respond with an error
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token",
      });
    }

    // If token is valid, attach the decoded userId to the request object
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log the error and send a generic server error response
    console.error("Error in verifyToken:", error);

    // Handle specific error cases like token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - token expired",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
