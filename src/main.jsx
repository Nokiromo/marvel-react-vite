import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/app/App";

import "./style/style.scss";

import MarvelService from './services/MarvelService';

const marvelService = new MarvelService()

marvelService.getAllCharacters(1011052).then(res => res.data.results.forEach(item => {return console.log(item.name)
  
}))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
