import { Request, Response } from "express"
import { api } from "../../../adapter"
import { config } from "dotenv"

config()

const {
    URL_SERVICE_MEDIA
} = process.env

const apiInstance = api(URL_SERVICE_MEDIA ?? "")

const create = async (req: Request, res: Response) => {
    try {
        const media = await apiInstance.post('/media', req.body)
        return res.status(200).json(media.data)
    } catch (error: any) {
        const { status, data } = error.response
        
        return res.status(status).json(data)
    }
}

export default create
