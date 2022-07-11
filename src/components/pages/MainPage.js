import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundery/ErrorBoundary";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)

    function onCharSelected(id) {
        setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar
                    onCharSelected={onCharSelected}
                />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onCharSelected={onCharSelected}
                        selectedChar={selectedChar}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo
                        charId={selectedChar}
                    />
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage