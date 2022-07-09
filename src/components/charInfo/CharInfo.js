import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import decoration from '../../resources/img/vision.png';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const { loading, error, getCharacter } = useMarvelService()

    function updateChar() {
        if (!props.charId) return
        getCharacter(props.charId)
            .then(onCharLoaded)
    }

    function onCharLoaded(char) {
        setChar(char)
    }

    const spinner = loading ? <Spinner /> : null
    const errorBlock = error ? <ErrorBlock /> : null
    const content = !(loading || error || !char) ? <ListComics char={char} /> : null
    const skeleton = content || spinner || errorBlock ? null : <Skeleton />

    return (
        <div className="char__info">
            {content}
            {spinner}
            {errorBlock}
            {skeleton}
            <img className="bg-decoration" src={decoration} alt="vision" />
        </div>
    )


}

const ListComics = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics, hasImg } = char

    function prepareListComics(comics) {
        return comics.map((el, i) => {
            if (i < 10) {
                return (
                    <li className="char__comics-item" key={i}>
                        {el.name}
                    </li>
                )
            }
            return null
        })
    }

    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={name}
                    style={hasImg ? null : { objectFit: "contain" }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length ? prepareListComics(comics) : 'There is no comics with this character'}
            </ul>
        </>
    )
}

export default CharInfo;