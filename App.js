import React from 'react'
import './App.css'
import Main from './Main.js'
import Search from './Search.js'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

render() {
  return(
    <div>
   	  <Route exact path='/'component={ Main } />
	     <Route exact path='/search' component={ Search } />
       </div>
	     )
	    }
    }

export default BooksApp
