import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useListItems from '../../hooks/useListItems';
import CharCard from '../charCard/CharCard';

import './charList.scss';

const CharList = (props) => {
    const { list,
        endOfList,
        spinner,
        errorBlock,
        endList,
        lastRow } = useListItems('characters', 210, 9)

    function prepareList(chars) {
        return (
            <TransitionGroup className="char__grid">
                {chars.map(char => {
                    return (
                        <CSSTransition
                            key={char.id}
                            timeout={500}
                            classNames="item"
                        >
                            <CharCard
                                name={char.name}
                                thumbnail={char.thumbnail}
                                hasImg={char.hasImg}

                                id={char.id}
                                selectedChar={props.selectedChar}
                                onCharSelected={() => props.onCharSelected(char.id)}
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {prepareList(list)}
            </ul>
            {endOfList ? endList : null}
            {spinner}
            {errorBlock}
            <div
                ref={lastRow}
                style={{ height: 20, marginTop: 150 }}
            />
        </div>
    )
}

export default CharList;