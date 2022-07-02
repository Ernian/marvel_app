import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundery/ErrorBoundary";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)

    function onCharSelected(id) {
        setSelectedChar(id)
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar
                    onCharSelected={onCharSelected}
                />
                <div className="char__content">
                    <CharList
                        onCharSelected={onCharSelected}
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

export default App;