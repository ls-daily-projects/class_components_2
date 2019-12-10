import React from "react"

import { SearchForm } from "./components"

import { cacheUser, checkCache } from "./storage"
import { fetchUser } from "./githubApi"

type AppProps = {}
type AppState = {
    searchHistory: string[]
}

class App extends React.Component<AppProps, AppState> {
    state = {
        searchHistory: []
    }

    componentDidMount() {}

    async handleSearchFormSubmit(searchQuery: string) {
        const cachedUser = checkCache(searchQuery)

        if (cachedUser) {
            console.log({ cachedUser })
            return
        }

        try {
            const fetchedUser = await fetchUser(searchQuery)
            cacheUser(fetchedUser)
            console.log({ fetchedUser })
        } catch (error) {
            const { status, statusText } = error.response
            console.log(status, statusText, error.isAxiosError, error.message)
        }
    }

    render() {
        return (
            <div>
                <SearchForm onSubmit={this.handleSearchFormSubmit}></SearchForm>
            </div>
        )
    }
}

export default App
