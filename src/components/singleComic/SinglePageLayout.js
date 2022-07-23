import { useParams, Link } from 'react-router-dom';
import useItem from '../../hooks/useItem';
import './singleComic.scss';

const SinglePageLayout = ({ section }) => {
    const { id } = useParams();
    const {
        item,
        spinner,
        errorBlock } = useItem('info', section, id)


    const backToAll = section === 'comics' ? '/comics' : '/'
    const comic = !(spinner || errorBlock || !item) ?
        (<div className="single-comic">
            <img src={item.thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                {section === 'comics' ?
                    <h2 className="single-comic__name">{item.title}</h2>
                    : <h2 className="single-comic__name">{item.name}</h2>
                }
                <p className="single-comic__descr">{item.description}</p>
                {section === 'comics' ? <p className="single-comic__descr">Count of page: {item.pageCount}</p> : null}
                {section === 'comics' ? <p className="single-comic__descr">Language: {item.language}</p> : null}
                {section === 'comics' ? <div className="single-comic__price">{item.price}$</div> : null}
            </div>
            <Link to={backToAll} className="single-comic__back">Back to all</Link>
        </div>) : null

    return (
        <>
            {comic}
            {spinner}
            {errorBlock}
        </>
    )
}

export default SinglePageLayout;