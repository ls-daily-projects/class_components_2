import React from "react"

import { SearchForm } from "./components"

import { fetchUser } from "./githubApi"

type AppProps = {}
type AppState = {}

class App extends React.Component<AppProps, AppState> {
    async handleSearchFormSubmit(searchQuery: string) {
        if (sessionStorage.getItem(searchQuery.toLowerCase())) {
            console.log(
                `From sessionStorage => ${sessionStorage.getItem(
                    searchQuery.toLowerCase()
                )}`
            )
            return
        }
        try {
            const user = await fetchUser(searchQuery)
            sessionStorage.setItem(
                user.login.toLowerCase(),
                JSON.stringify(user)
            )
            console.log(user)
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
