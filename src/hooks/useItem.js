import { useState, useEffect } from "react";
import useMarvelService from '../services/MarvelService';
import Spinner from '../components/spinner/Spinner';
import ErrorBlock from '../components/errorBlock/ErrorBlock';

const useItem = (component, section, charId) => {
    const [item, setItem] = useState(null)
    const { loading, error, getItem } = useMarvelService()

    useEffect(() => {
        updateItem()
    }, [charId])

    function updateItem() {
        if (component === 'info') {
            if (!charId) return
            getItem(section, charId)
                .then(onItemLoaded)
        }
        if (component === 'random') {
            const id = Math.floor(Math.random() * 400 + 1011000)
            getItem(section, id)
                .then(onItemLoaded)
        }
    }

    function onItemLoaded(item) {
        setItem(item)
    }

    const spinner = loading ? <Spinner /> : null
    const errorBlock = error ? <ErrorBlock /> : null

    return ({
        item,
        spinner,
        errorBlock,
        updateItem
    })
}

export default useItem