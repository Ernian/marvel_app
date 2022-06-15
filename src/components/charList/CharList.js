import { Component } from 'react';
import CharCard from '../charCard/CharCard';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService

    componentDidMount() {
        this.updateChars()
    }

    updateChars = () => {
        this.setState({ loading: true })
        this.marvelService.getAllCharacters()
            .then(this.onLoadChars)
            .catch(this.onError)
    }

    onLoadChars = (characters) => {
        this.setState(({ chars }) => ({
            chars: chars.concat(characters),
            loading: false,
            error: false,
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    prepareList = (chars) => {
        return chars.map(char => {
            return <CharCard
                name={char.name}
                thumbnail={char.thumbnail}
                hasImg={char.hasImg}
                key={char.id}
                onCharSelected={() => this.props.onCharSelected(char.id)}
            />
        })
    }

    render() {
        const { chars, loading, error } = this.state
        const spinner = loading ? <Spinner /> : null
        const errorBlock = error ? <ErrorBlock /> : null
        const content = !(loading || error) ? this.prepareList(chars) : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                {spinner}
                {errorBlock}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;