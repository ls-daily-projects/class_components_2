import { GithubUser } from "../types"

const CACHE_KEY = "users_cache"

const retrieveCache: () => any[] = () => {
    try {
        const cacheJson = sessionStorage.getItem(CACHE_KEY)
        if (!cacheJson) throw new Error("Cache is empty!")
        return JSON.parse(cacheJson)
    } catch (error) {
        sessionStorage.removeItem(CACHE_KEY)
        return []
    }
}

const cacheUser = (userData: GithubUser) => {
    const cache = retrieveCache()

    cache.push(userData)

    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

const checkCache = (username: string) => {
    return retrieveCache().find(
        (user: GithubUser) =>
            user.login.toLowerCase() === username.toLowerCase()
    )
}

export { retrieveCache, cacheUser, checkCache }
