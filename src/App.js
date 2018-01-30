import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note'
import NoteForm from './NoteForm/NoteForm'
import NavBar from './Navbar/NavBar'

// FIREBASE IMPORTS
import { DB_CONFIG } from './Config/config'
import firebase from 'firebase/app'
import 'firebase/database'




class App extends Component {
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this)

    // INITIALIZE FIREBASE
    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database().ref().child('notes')

    // Set up State to Components
    this.state = {
      notes: [
        // {id: 1, noteContent: "Note 1 Here"},
        // {id: 2, noteContent: "Note 2 Here"}
      ]
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      })

      this.setState({
        notes: previousNotes
      })
    })

    // this.database.on('child_removed', snap => {
    //   previousNotes.map((i) => {
    //     if(i.id === snap.key) {
    //     previousNotes.splice(i, 1)
    //     }
    //   })
    this.database.on('child_removed', snap => {
      for (let i = 0; i < previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1)
        }
      }
      this.setState({
        notes: previousNotes
      })
    })
  }


  // ADDING NOTES BY SUBMIT BUTTON
  addNote(note){
      this.database.push().set({noteContent: note})
    // const previousNotes = this.state.notes
    // previousNotes.push({id: previousNotes.length + 1, noteContent: note})
    // this.setState({
    //   notes: previousNotes
    // }) 
  }

  removeNote(noteId){
    this.database.child(noteId).remove()
  }


  render() {
    return (
              <div className="main">
              <NavBar />
              <div className="container mt-5">
              
                <div className="row">
                <div className=" col-sm-6 ">
                {
                  this.state.notes.map((note) => {
                    return (
                  <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id} 
                  removeNote={this.removeNote}
                  />
                    )
                  })
                }
                  </div>
                  <div className="col-sm-6">
                  <NoteForm
                  addNote={this.addNote}
                  />
                  </div>
                </div>
              </div>
              </div>
            )
          }
        } 

export default App;
