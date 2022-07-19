import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useListItems from '../../hooks/useListItems';
import ComicCard from '../comicCard/ComicCard';

import './comicsList.scss';

const ComicsList = () => {
    const { list,
        endOfList,
        spinner,
        errorBlock,
        endList,
        lastRow } = useListItems('comics', 2000, 8)

    function prepareList(comics) {
        return (
            <TransitionGroup className="comics__grid">
                {comics.map(comic => {
                    return (
                        <CSSTransition
                            key={comic.id}
                            timeout={500}
                            classNames="item"
                        >
                            <ComicCard
                                id={comic.id}
                                title={comic.title}
                                img={comic.thumbnail}
                                price={comic.price}
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }

    return (
        <div className="comics__list">
            <ul>
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

export default ComicsList;