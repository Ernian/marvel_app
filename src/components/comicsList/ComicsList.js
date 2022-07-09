import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import useMarvelService from '../../services/MarvelService';
import useScrollLoading from '../../hooks/useScrollLoading';
import ComicCard from '../comicCard/ComicCard';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(2000)
    const [endOfComics, setEndOfComics] = useState(false)
    const lastRow = useRef()
    const observer = useRef()

    const { loading, error, getComics } = useMarvelService()

    useEffect(() => {
        updateComics()
    }, [])

    useEffect(() => {
        scrollLoading()
    }, [loading, offset, endOfComics])

    const scrollLoading = useScrollLoading(observer, loading, updateComics, lastRow, endOfComics)

    function updateComics() {
        getComics(offset)
            .then(onLoadComics)
    }

    function onLoadComics(loadedComics) {
        if (loadedComics.length < 8) {
            setEndOfComics(true)
        }
        setComics(comics => comics.concat(loadedComics))
        setOffset(offset => offset + 8)
    }

    function prepareList(comics) {
        return comics.map(comic => {
            return <ComicCard
                key={comic.id}
                title={comic.title}
                img={comic.thumbnail}
                price={comic.price}
            />
        })
    }

    const spinner = loading && !endOfComics ? <Spinner /> : null
    const errorBlock = error ? <ErrorBlock /> : null
    const endList = <h2 style={{ marginTop: 50 }}> There is no more comics...</h2 >

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {prepareList(comics)}
            </ul>
            {endOfComics ? endList : null}
            {spinner}
            {errorBlock}
            <div
                ref={lastRow}
                style={{ height: 20, marginTop: 150 }}
            />
        </div>
    )
}

export default ComicsList;