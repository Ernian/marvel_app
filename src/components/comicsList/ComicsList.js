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
        return comics.map(comic => {
            return <ComicCard
                key={comic.id}
                title={comic.title}
                img={comic.thumbnail}
                price={comic.price}
            />
        })
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
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