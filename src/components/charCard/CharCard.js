const CharCard = (props) => {
    const { name, thumbnail, hasImg } = props

    return (
        <li className="char__item">
            <img
                src={thumbnail}
                alt={name}
                style={hasImg ? null : { objectFit: "contain" }}
            />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharCard