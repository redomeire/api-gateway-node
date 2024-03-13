import { api } from "../../../adapter"
import { Response, Request } from "express"
import { config } from "dotenv"
import jwt from "jsonwebtoken"

config()

const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
    URL_SERVICE_USER
} = process.env

const apiInstance = api(URL_SERVICE_USER ?? "")

const register = async (req: Request, res: Response) => {
    try {
        const user = await apiInstance.post('/users/login', req.body)
        const userData = await user.data.data

        const token = jwt.sign(userData, JWT_SECRET as string, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
        const refreshToken = jwt.sign(userData, JWT_SECRET_REFRESH_TOKEN as string, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED })

        await apiInstance.post('/refresh-tokens/create', { refresh_token: refreshToken, user_id: userData.id })

        return res.status(200).json({
            status: 'success',
            data: {
                token,
                refreshToken
            }
        })
    } catch (error: any) {
        const { status, data } = error?.response
        return res.status(status ?? 500).json(data)
    }
}

export default register
