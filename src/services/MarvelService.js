class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=f927698dabd9d0ad847fe72c0af91640'

    getResource = async (url) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._prepareData)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._prepareData(res.data.results[0])
    }

    _prepareDescription = (desc) => {
        if (!desc) {
            return 'There is no description for this character'
        }
        if (desc.length > 210) {
            return `${desc.slice(0, 210)}...`
        }
        return desc
    }

    _checkImg = (path) => {
        return path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    }

    _prepareData = (char) => {
        return {
            name: char.name,
            description: this._prepareDescription(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            hasImg: this._checkImg(char.thumbnail.path + '.' + char.thumbnail.extension)
        }
    }
}

export default MarvelService