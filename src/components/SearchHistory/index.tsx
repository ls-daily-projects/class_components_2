import React from "react"

import { GithubUser } from "../../types"

type SearchHistoryProps = {
    searchHistory: GithubUser[]
}
type SearchHistoryState = {}

class SearchHistory extends React.Component<
    SearchHistoryProps,
    SearchHistoryState
> {
    render() {
        return (
            <section>
                <h2>Search History</h2>
                <ul
                    style={{
                        display: "flex",
                        maxWidth: "50%",
                        justifyContent: "space-around",
                        listStyle: "none"
                    }}
                >
                    {this.props.searchHistory.map((user: GithubUser) => (
                        <li
                            key={user.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <img
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%"
                                }}
                                src={user.avatar_url}
                                alt={`Avatar for ${user.login}`}
                            />
                            <h3>{user.login}</h3>
                            {user.bio && <p>{user.bio}</p>}
                            <span>{user.followers} followers</span>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

export default SearchHistory
