import { api } from "../../../adapter"
import { Response, Request } from "express"
import { config } from "dotenv"

config()

const { URL_SERVICE_MEDIA } = process.env

const apiInstance = api(URL_SERVICE_MEDIA ?? "")

const get = async (req: Request, res: Response) => {
    try {
        const medias = await apiInstance.get('/media')
        return res.status(200).json(medias.data)
    } catch (error: any) {
        const { status, data } = error?.response
        // console.log(error);
        return res.status(status ?? 500).json(data)
    }
}

export default get
