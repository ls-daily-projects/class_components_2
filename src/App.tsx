import React from "react"

import { SearchForm } from "./components"

import { GithubUser } from "./types"
import { retrieveCache, cacheUser, checkCache } from "./storage"
import { fetchUser } from "./githubApi"

type AppProps = {}
type AppState = {
    searchHistory: string[]
}

class App extends React.Component<AppProps, AppState> {
    state = {
        searchHistory: []
    }

    componentDidMount() {
        this.updateSearchHistory()
    }

    updateSearchHistory() {
        this.setState({ ...this.state, searchHistory: retrieveCache() })
    }

    async handleSearchFormSubmit(searchQuery: string) {
        const cachedUser = checkCache(searchQuery)

        if (cachedUser) {
            console.log({ cachedUser })
            return
        }

        try {
            const fetchedUser = await fetchUser(searchQuery)
            cacheUser(fetchedUser)
            this.updateSearchHistory()
            console.log({ fetchedUser })
        } catch (error) {
            console.log(error, error.response)
        }
    }

    render() {
        return (
            <div>
                <SearchForm
                    onSubmit={this.handleSearchFormSubmit.bind(this)}
                ></SearchForm>
            </div>
        )
    }
}

export default App
