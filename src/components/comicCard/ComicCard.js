import { Link } from "react-router-dom"

const ComicCard = ({ img, title, price, id }) => {
    return (
        <li className="comics__item">
            <Link to={`${id}`}>
                <img src={img} alt="ultimate war" className="comics__item-img" />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
            </Link>
        </li >
    )
}

export default ComicCard