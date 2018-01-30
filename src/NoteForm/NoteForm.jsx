import React, {Component} from 'react'

class NoteForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            newNoteContent: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this)
        this.writeNote = this.writeNote.bind(this)
    }

    // HANDLE USER INPUTS
    handleUserInput(e){
        // e.preventDefault()
        // console.log(this)

            this.setState(
                { newNoteContent: e.target.value }
            )
    }

    // WRITE NOTES
    writeNote(e) {

        if (this.state.newNoteContent.length < 5){
            alert('Note must be 5 characters long')
        } else  {
            this.props.addNote(this.state.newNoteContent)
            this.setState({
                newNoteContent: '' // SET text box back to empty string
            })
        }
    }

    render (props) {
        return (
            <div className="container mt-5">
            <form action="">
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <h4>Please Enter a task</h4>
                        <input
                        type="text"
                        className="form-control mb-3"
                        onChange={this.handleUserInput}
                        value={this.state.newNoteContent}
                        placeholder="Add..." />

                        <button type="button" className="btn btn-dark"
                        onClick={this.writeNote}
                        >Submit</button>
                    </div>
                </div>
            </form>
            </div>
        )
    }
}

export default NoteForm