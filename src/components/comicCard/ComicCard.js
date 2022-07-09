const ComicCard = ({ img, title, price }) => {
    return (
        <li className="comics__item">
            <a href="#">
                <img src={img} alt="ultimate war" className="comics__item-img" />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
            </a>
        </li>
    )
}

export default ComicCard