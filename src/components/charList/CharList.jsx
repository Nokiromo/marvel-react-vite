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
        offset: 210, 
        charEnded: false,
        
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

    itemRefs = []

setRef = (ref) => {
    if (ref) {
        this.itemRefs.push(ref);
    }
}

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    onCharLoaded = (newChars) => {
    this.setState(({chars, offset}) => {
        const ids = new Set(chars.map(c => c.id));
        const filtered = newChars.filter(c => !ids.has(c.id));
        return {
        chars: [...chars, ...filtered],
        loading: false,
        newItemLoading: false,
        offset: offset + filtered.length, 
        charEnded: newChars.length < 9
        };
    });
    }

    marvelService = new MarvelService()


    onError = () =>{     
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(chars) {
        return chars.map((ch, i) => {
            const imgStyle = ch.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                ? { objectFit: 'contain' }
                : { objectFit: 'cover' };

            return (

                <li className="char__item"  key={ch.id} 
                 ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(ch.id);
                        this.focusOnItem(i);
                    }}>
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

