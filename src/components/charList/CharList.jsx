import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    state ={
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1548, 
        charEnded: false
    }

    componentDidMount() {
        if (!this.state.chars.length) {
            this.onRequest();
        }
}  

    onRequest = (offset) =>{
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    onCharLoaded = (newChars) => {

        let ended = false;
        if (newChars.length < 9){
            ended = true
        }


          this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended

        }))
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

                <li className="char__item"  key={ch.id} 
                onClick={() => this.props.onCharSelected(ch.id)}>
                    <img style={imgStyle} src={ch.thumbnail} alt={ch.name} />
                    <div className="char__name">{ch.name}</div>
                </li>
            );
        });
    }




    render() {
        const {chars,loading, error, offset, newItemLoading, charEnded} = this.state
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
                <button  
                disabled ={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => this.onRequest(offset)}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

