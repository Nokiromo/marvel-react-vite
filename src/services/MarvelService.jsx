class MarvelService{
    _apiBase ='https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=725f6cddccb219e7f5c6ef27cf2c94c8'

    getResource = async (url) =>{
        let res = await fetch(url);
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async() =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._taransformCharacter)
    }
    getCharacter = async (id) =>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._taransformCharacter(res.data.results[0])
    }

    _taransformCharacter = (char) =>{
        return {
                    name: char.name,
                    description: char.description,
                    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                    homepage: char.urls[0].url,
                    wiki: char.urls[1].url 
        }
    }
}

export default MarvelService