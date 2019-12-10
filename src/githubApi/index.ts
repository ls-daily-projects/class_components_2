import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json"
    }
})

export const fetchUser = async (username: string) => {
    const { data } = await axiosInstance.get(`/users/${username}`)
    return data
}
