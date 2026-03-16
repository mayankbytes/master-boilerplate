import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const comparePassword = async (password: string, userPassword: string) => {
  const res = await bcrypt.compare(password, userPassword)
  return res
}


export const generateAuthToken = (id: number, company_id: number | null, role_id: number) => {
  const sceret: any = process.env.JWT_SECRET
  const res = jwt.sign({ id, company_id, role_id }, sceret, {
    expiresIn: "2d",
  })
  return res
}