import React, {Component} from 'react'
import './Note.css'
import PropTypes from 'prop-types'
import logo from '../logo.svg'

class Note  extends Component{
    constructor(props){
        super(props)
        this.noteContent = props.noteContent
        this.noteId = props.noteId
        this.handleRemoveNote = this.handleRemoveNote.bind(this)

    }

    handleRemoveNote(id){
       
           window.alert('You are about to delete the Note')
            this.props.removeNote(id)
    }
    render(props){
        return (
            <div className="card bg-dark text-white mt-5 animated fadeIn " >
            <div className="card-body">
              <p className="card-text">Email me at: <kbd>coderichardson@gmail.com</kbd></p>
              <img className=" logo card-img-top " src={logo} alt="Card image cap"></img>
              <h5 className="card-title  animated fadeInLeft animation-delay-200">{this.noteContent}</h5>
              <a 
              className="btn btn-info "
              onClick={() => this.handleRemoveNote(this.noteId)}
              >
              Delete</a>
              </div>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note