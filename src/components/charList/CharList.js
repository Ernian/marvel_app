import { useState, useEffect, useRef } from 'react';
import CharCard from '../charCard/CharCard';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charsList, setCharList] = useState([])
    const [offset, setOffset] = useState(210)
    const [endOfChars, setEndOfChars] = useState(false)
    const lastR = useRef()
    const observer = useRef()

    const { loading, error, getAllCharacters } = useMarvelService()

    useEffect(() => {
        updateChars()
    }, [])

    useEffect(() => {
        scrollLoading()
    }, [loading, offset, endOfChars])

    function scrollLoading() {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(
            (entries, observer) => {
                if (entries[0].isIntersecting && !loading) {
                    updateChars()
                }
                if (endOfChars) {
                    observer.unobserve(entries[0].target)
                }
            },
            {
                threshold: 1,
            }
        )
        observer.current.observe(lastR.current)
    }

    function updateChars() {
        getAllCharacters(offset)
            .then(onLoadChars)
    }

    function onLoadChars(characters) {
        if (characters.length < 9) {
            setEndOfChars(true)
        }

        setCharList(charList => charList.concat(characters))
        setOffset(offset => offset + 9)
    }

    function prepareList(chars) {
        return chars.map(char => {
            return <CharCard
                name={char.name}
                thumbnail={char.thumbnail}
                hasImg={char.hasImg}
                key={char.id}
                id={char.id}
                selectedChar={props.selectedChar}
                onCharSelected={() => props.onCharSelected(char.id)}
            />
        })
    }

    const spinner = loading && !endOfChars ? <Spinner /> : null
    const errorBlock = error ? <ErrorBlock /> : null
    const endList = <h2 style={{ marginTop: 50 }}> There is no more characters...</h2 >

    return (
        <div className="char__list">
            <ul className="char__grid">
                {prepareList(charsList)}
            </ul>
            {endOfChars ? endList : null}
            {spinner}
            {errorBlock}
            <div
                ref={lastR}
                style={{ height: 20, marginTop: 150 }}
                id="lastRow"
            />
        </div>
    )
}

export default CharList;