import React from "react"
import githubUsernameRegex from "github-username-regex"

type SearchFormProps = {
    onChange?: (searchQuery: string) => void
    onSubmit: (searchQuery: string) => void
}
type SearchFormState = {
    searchQuery: string
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    state = {
        searchQuery: ""
    }

    handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        const { value } = event.currentTarget

        if (value.length > 1 && !githubUsernameRegex.test(value)) return

        this.setState({
            ...this.state,
            searchQuery: value
        })
        if (this.props.onChange) {
            this.props.onChange(this.state.searchQuery)
        }
    }

    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!this.state.searchQuery) return
        this.props.onSubmit(this.state.searchQuery)
        this.setState({ ...this.state, searchQuery: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
                <h2>Find a GitHub User</h2>
                <label htmlFor="user-search">Username</label>
                <input
                    type="search"
                    id="user-search"
                    placeholder="Search by GitHub username..."
                    pattern="([a-z0-9](?:-?[a-z0-9]){0,38})"
                    value={this.state.searchQuery}
                    onChange={this.handleInputChange.bind(this)}
                />
                <button>Search</button>
            </form>
        )
    }
}

export default SearchForm
