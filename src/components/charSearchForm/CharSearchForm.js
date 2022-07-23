import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';


import './charSearchForm.scss';

const CharSearchForm = () => {
    const { loading, error, getCharacterByName } = useMarvelService()
    const [name, setName] = useState('')
    const [char, setChar] = useState(null)
    const [validQuery, setValidQuery] = useState(true)

    function changeValue(event) {
        setName(event.target.value)
    }

    function onCharSearch(event) {
        event.preventDefault()
        if (!name) {
            setValidQuery(false)
            return null
        }
        setValidQuery(true)
        getCharacterByName(name)
            .then(char => setChar(char))
    }

    const charLink = char && char[0] && !error && validQuery ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name}'s page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
        : null

    const queryError = validQuery && !error ? null :
        <div className="char__search-error">This field is required</div>

    const isCharFind = char && !char[0] && validQuery && !error ?
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>
        : null

    const errorMessage = error ?
        <div className="char__search-error">
            Something wrang, please try again
        </div>
        : null

    return (
        <div className="char__search-form">
            <form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input
                        id="charName"
                        name='charName'
                        type='text'
                        placeholder="Enter name"
                        value={name}
                        onChange={changeValue}
                    />
                    <button
                        type='submit'
                        className="button button__main"
                        disabled={loading}
                        onClick={onCharSearch}
                    >
                        <div className="inner">find</div>
                    </button>
                </div>
                {charLink}
                {queryError}
                {isCharFind}
                {errorMessage}
            </form>
        </div>
    )
}

export default CharSearchForm;