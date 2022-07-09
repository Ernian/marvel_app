import { useState, useEffect, useRef } from 'react'
import useMarvelService from '../services/MarvelService'
import useScrollLoading from './useScrollLoading'
import Spinner from '../components/spinner/Spinner'
import ErrorBlock from '../components/errorBlock/ErrorBlock'

const useListItems = (section, offsetList, limit) => {
    const [list, setList] = useState([])
    const [offset, setOffset] = useState(offsetList)
    const [endOfList, setEndOfList] = useState(false)
    const lastRow = useRef()
    const observer = useRef()

    const { loading, error, getData } = useMarvelService()

    useEffect(() => {
        updateList()
    }, [])

    useEffect(() => {
        scrollLoading()
    }, [loading, offset, endOfList])

    const scrollLoading = useScrollLoading(observer, loading, updateList, lastRow, endOfList)

    function updateList() {
        getData(section, offset, limit)
            .then(onLoadItems)
    }

    function onLoadItems(items) {
        if (items.length < limit) {
            setEndOfList(true)
        }
        setList(list => list.concat(items))
        setOffset(offset => offset + limit)
    }

    const spinner = loading && !endOfList ? <Spinner /> : null
    const errorBlock = error ? <ErrorBlock /> : null
    const endList = <h2 style={{ marginTop: 50 }}> End of scroll...</h2 >

    return ({
        list,
        endOfList,
        spinner,
        errorBlock,
        endList,
        lastRow
    })
}

export default useListItems