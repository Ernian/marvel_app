import React from 'react';
import CharCard from '../charCard/CharCard';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends React.Component {
    state = {
        charsList: [],
        loading: true,
        error: false,
        offset: 210,
        endOfChars: false,
    }

    marvelService = new MarvelService

    componentDidMount() {
        this.updateChars()
        this.scrollLoading()
    }

    scrollLoading = () => {

        const observer = new IntersectionObserver(
            (entries, observer) => {
                if (entries[0].isIntersecting && !this.state.loading) {
                    this.updateChars()
                }
                if (this.state.endOfChars) {
                    observer.unobserve(entries[0].target)
                }
            },
            {
                threshold: 1,
            }
        )

        const lastChar = document.querySelector('#lastRow')
        observer.observe(lastChar)
    }

    updateChars = () => {
        this.setState({ loading: true })
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onLoadChars)
            .catch(this.onError);
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
                id={char.id}
                selectedChar={this.props.selectedChar}
                onCharSelected={() => this.props.onCharSelected(char.id)}
            />
        })
    }

    render() {
        const { charsList, loading, error } = this.state
        const spinner = loading ? <Spinner /> : null
        const errorBlock = error ? <ErrorBlock /> : null
        const content = !error ? this.prepareList(charsList) : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                {spinner}
                {errorBlock}
                <div
                    ref={this.lastRow}
                    style={{ height: 20, marginTop: 150 }}
                    id="lastRow"
                />
            </div>
        )
    }
}

export default CharList;