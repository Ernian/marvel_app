import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from '../charSearchForm/CharSearchForm';
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
                <div className="sticky">
                    <ErrorBoundary>
                        <CharInfo
                            charId={selectedChar}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage