import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
    const { loading, request, error } = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=f927698dabd9d0ad847fe72c0af91640'
    const noImgUrl = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    const getAllCharacters = async (offset = 210) => {
        const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return response.data.results.map(_prepareData)
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _prepareData(response.data.results[0])
    }

    const getComics = async (offset = 1) => {
        const response = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return response.data.results.map(_prepareData)
    }

    const _prepareDescription = (desc) => {
        if (!desc) {
            return 'There is no description for this character'
        }
        if (desc.length > 210) {
            return `${desc.slice(0, 210)}...`
        }
        return desc
    }

    const _checkImg = (url) => {
        return url !== noImgUrl
    }

    const _prepareData = (item) => {
        return {
            id: item.id,
            name: item.name,
            description: _prepareDescription(item.description),
            thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            homepage: item.urls[0]?.url,
            wiki: item.urls[1]?.url,
            hasImg: _checkImg(`${item.thumbnail.path}.${item.thumbnail.extension}`),
            comics: item.comics?.items,
            title: item?.title,
            price: (item.prices ? item.prices[0].price : null),
        }
    }

    return { loading, error, getAllCharacters, getCharacter, getComics }
}

export default useMarvelService