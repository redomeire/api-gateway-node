import { Request, Response } from "express"
import { config } from "dotenv"
import { api } from "../../../adapter"

config()

const { URL_SERVICE_MEDIA } = process.env

const apiInstance = api(URL_SERVICE_MEDIA ?? "")

const deleteImage = async (req: Request, res: Response) => {
    const id = req.body.id

    try {
        const deletedImage = await apiInstance.delete('/media', {
            data: {
                id
            }
        })
        return res.status(200).json(deletedImage.data)
    } catch (error: any) {
        const { status, data } = error.response
        
        return res.status(status).json(data)
    }
}

export default deleteImage
