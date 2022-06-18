import { Component } from 'react';
import CharCard from '../charCard/CharCard';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charsList: [],
        loading: true,
        newCharLoading: false,
        error: false,
        offset: 210,
        endOfChars: false,
    }

    marvelService = new MarvelService

    componentDidMount() {
        this.updateChars()
    }

    updateChars = () => {
        this.setState({ newCharLoading: true })
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onLoadChars)
            .catch(this.onError)
    }

    onLoadChars = (characters) => {
        if (characters.length < 9) {
            this.setState({
                endOfChars: true
            })
        }

        this.setState(({ charsList, offset }) => ({
            charsList: charsList.concat(characters),
            loading: false,
            newCharLoading: false,
            error: false,
            offset: offset + 9,
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
        const { charsList, loading, error, newCharLoading, endOfChars } = this.state
        const spinner = loading ? <Spinner /> : null
        const errorBlock = error ? <ErrorBlock /> : null
        const content = !(loading || error) ? this.prepareList(charsList) : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                {spinner}
                {errorBlock}
                <button
                    className="button button__main button__long"
                    disabled={newCharLoading}
                    onClick={this.updateChars}
                    style={{ 'display': endOfChars ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;