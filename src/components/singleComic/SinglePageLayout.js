import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useItem from '../../hooks/useItem';
import './singleComic.scss';

const SinglePageLayout = ({ section }) => {
    const { id } = useParams();
    const {
        item,
        spinner,
        errorBlock } = useItem('info', section, id)

    const isComic = section === 'comics'
    const backToAll = isComic ? '/comics' : '/'

    const comic = !(spinner || errorBlock || !item) ?
        (<div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content="Page with marvel comic/character"
                />
                <meta
                    name="keywords"
                    content="Marvel, comics, character"
                />
                <title>{`${isComic ? item.title : item.name} page`}</title>
            </Helmet>
            <img src={item.thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                {isComic ?
                    <h2 className="single-comic__name">{item.title}</h2>
                    : <h2 className="single-comic__name">{item.name}</h2>
                }
                <p className="single-comic__descr">{item.description}</p>
                {isComic ? <p className="single-comic__descr">Count of page: {item.pageCount}</p> : null}
                {isComic ? <p className="single-comic__descr">Language: {item.language}</p> : null}
                {isComic ? <div className="single-comic__price">{item.price}$</div> : null}
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