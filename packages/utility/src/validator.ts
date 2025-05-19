import { validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

   res.status(400).json({
    data: null,
    errors: errors.mapped(),
    message: "",
  })
}
