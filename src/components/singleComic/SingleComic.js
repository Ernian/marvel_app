import { useParams, Link } from 'react-router-dom';
import useItem from '../../hooks/useItem';
import './singleComic.scss';

const SingleComic = () => {
    const { id } = useParams();
    const {
        item,
        spinner,
        errorBlock } = useItem('info', 'comics', id)

    const comic = !(spinner || errorBlock || !item) ?
        (<div className="single-comic">
            <img src={item.thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.title}</h2>
                <p className="single-comic__descr">{item.description}</p>
                <p className="single-comic__descr">Count of page: {item.pageCount}</p>
                <p className="single-comic__descr">Language: {item.language}</p>
                <div className="single-comic__price">{item.price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>) : null

    return (
        <>
            {comic}
        </>
    )
}

export default SingleComic;