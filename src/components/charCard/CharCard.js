const CharCard = (props) => {
    const {
        name,
        thumbnail,
        hasImg,
        onCharSelected,
        id,
        selectedChar
    } = props

    let style = 'char__item'
    if (id === selectedChar) {
        style += ' char__item_selected'
    }

    return (
        <li className={style}>
            <img
                src={thumbnail}
                alt={name}
                style={hasImg ? null : { objectFit: "contain" }}
                onClick={onCharSelected}
            />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharCard