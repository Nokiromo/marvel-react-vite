import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    state ={
        chars: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(this.onCharLoaded)
        .catch(this.onError)
    }   

    
    onCharLoaded = (chars) => {
          this.setState({
            chars,
            loading: false})
    }
    marvelService = new MarvelService()


    onError = () =>{     
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(chars) {
        return chars.map((ch) => {
            const imgStyle = ch.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                ? { objectFit: 'contain' }
                : { objectFit: 'cover' };

            return (
                <li className="char__item" key={ch.id}>
                    <img style={imgStyle} src={ch.thumbnail} alt={ch.name} />
                    <div className="char__name">{ch.name}</div>
                </li>
            );
        });
    }




    render() {
        const {chars,loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ?  this.renderItems(chars) : null
 

        return(
        
            <div className="char__list">
            {errorMessage}
            {spinner}
                <ul className="char__grid">
                    {content}        
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;