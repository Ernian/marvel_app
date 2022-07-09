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