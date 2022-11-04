import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiErros";

export const errorMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
	
	if (error.name === 'ValidationError') {
		return res.status(400).json({ message: error.message });
	}
  
	if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
		return res.status(401).json({message: 'JWT error: ' + error.message});
	}

	const statusCode = error.statusCode ?? 500;
	return res.status(statusCode).json({message: error.message});
};