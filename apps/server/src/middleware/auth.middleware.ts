import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    );
    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  try {
    if ((req as AuthRequest).user?.role !== "ADMIN") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Access denied" });
  }
};
