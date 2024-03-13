import { api } from "../../../adapter"
import { Response, Request } from "express"
import { config } from "dotenv"

config()

const { URL_SERVICE_USER } = process.env

const apiInstance = api(URL_SERVICE_USER ?? "")

const register = async (req: Request, res: Response) => {
    try {
        const user = await apiInstance.post('/users/register', req.body)
        return res.status(200).json(user.data)
    } catch (error: any) {
        const { status, data } = error?.response
        return res.status(status ?? 500).json(data)
    }
}

export default register
