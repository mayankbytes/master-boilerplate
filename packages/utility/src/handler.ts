import { Response } from "express"

export const successHandler = (res: Response, data?: unknown, message?: string) => {
  console.info(res.req.method, res.req.baseUrl, "Ok")
  res.status(200).json({
    data: !data ? null : data,
    message: message || "Successful",
    error: null,
  })
}

export const errorHandler = (res: Response, error?: Error | unknown, message?: string, code?: number | undefined) => {
  console.error(res.req.method, res.req.baseUrl, res.req.body, error)
  res.status(code ?? 500).json({
    error: typeof error === "string" ? error : (error as Error)?.message,
    message: message || "Something went wrong.",
    data: null,
  })
}
