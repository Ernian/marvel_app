import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    marvelService = new MarvelService

    updateChar = () => {
        const { charId } = this.props
        if (!charId) return

        this.setState({
            loading: true
        })
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    render() {
        const { char, loading, error } = this.state
        const spinner = loading ? <Spinner /> : null
        const errorBlock = error ? <ErrorBlock /> : null
        const content = !(loading || error || !char) ? <View char={char} /> : null
        const skeleton = content || spinner || errorBlock ? null : <Skeleton />

        return (
            <div className="char__info">
                {content}
                {spinner}
                {errorBlock}
                {skeleton}
            </div>
        )
    }
}

const View = ({ char }) => {
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