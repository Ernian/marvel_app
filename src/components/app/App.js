import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundery/ErrorBoundary";

class App extends Component {
    state = {
        selectedChar: null,
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id,
        })
    }

    render() {
        const { selectedChar } = this.state

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar
                        onCharSelected={this.onCharSelected}
                    />
                    <div className="char__content">
                        <CharList
                            onCharSelected={this.onCharSelected}
                            selectedChar={selectedChar}
                        />
                        <ErrorBoundary>
                            <CharInfo
                                charId={selectedChar}
                            />
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        )
    }
}

export default App;