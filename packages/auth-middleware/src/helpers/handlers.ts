import { Request,Response,NextFunction } from 'express';
import { validationResult } from 'express-validator'

export const successHandler = (
    res: Response,
    data?: unknown,
    message?: string
) => {
    console.info(res.req.method, res.req.baseUrl, 'Ok');
    res.status(200).json({
        data,
        message: message || 'Successful',
        error: null,
    });
};

export const errorHandler = (
    res: Response,
    error?: Error | unknown,
    message?: string,
    code?: number | undefined
) => {
    console.error(res.req.method, res.req.baseUrl, res.req.body, error);
    res.status(code ?? 500).json({
        error,
        message:
            message || (error as Error)?.message || 'Something went wrong.',
        data: null,
    });
};


export const validate = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    return res.status(400).json({errors:errors.mapped(),message:"Bad Request",data:null});
}
