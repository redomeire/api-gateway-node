import axios from "axios";

const createApiInstance = (baseURL: string) => {
    const apiAdapter = axios.create({
        baseURL: baseURL,
        timeout: parseInt(process.env.TIMEOUT ?? "5000")
    })

    return apiAdapter
}

export default createApiInstance
