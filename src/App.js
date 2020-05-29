import React from 'react';
import './App.css';
import firebase from 'firebase';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';


class App extends React.Component{

  constructor(){
    super();
    this.state={
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }
  render(){
    return(
      <div className="app-container">
        <SidebarComponent 
        selectedNoteIndex={this.state.selectedNoteIndex}
        notes={this.state.notes}
        deleteNote={this.deleteNote}
        newNote={this.newNote}
        selectNote={this.selectNote}>
        </SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent
          selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}>
          </EditorComponent>
          : null
        }
      </div>
    );
  }

  componentDidMount = () => {
    firebase
    .firestore()
    .collection('notes')
    .onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(
        doc=>{
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
      console.log(notes);
      this.setState({notes : notes});
    });
  }
  selectNote = (note, index) => this.setState({selectedNoteIndex:index, selectedNote:note});
  
  newNote= async (title)=>{
    const note= {
      title: title,
      body: ''
      };
      const newFromDB= await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()

      });
      const newID= newFromDB.id;
      await this.setState({
        notes: [...this.state.notes, note]
      });

      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newID)[0])
      this.setState({
        selectedNote: this.state.notes[newNoteIndex],
        selectedNoteIndex: newNoteIndex
      });
    }
  
  deleteNote= async(note)=> {
    const noteIndex= this.state.notes.indexOf(note);
    await this.setState({notes:this.state.notes.filter(noteobj=> note!==note)})
    if(this.state.SelectedNoteIndex=== noteIndex){
      await this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      })
    }
    else if(noteIndex>this.state.selectedNoteIndex)
    {
      await this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
      this.selectNote(this.state.notes[this.state.selectedNoteIndex], this.state.selectedNoteIndex)
      
    }
    else{
        this.state.notes.length>1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex-1], this.state.selectedNoteIndex-1)
          :
          this.setState({
            selectedNoteIndex: null,
            selectedNote: null
          })
      }

      firebase.firestore().collection('notes').doc(note.id).delete();
    
  }
  
  noteUpdate=(id, noteObj)=>{
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title, 
        body: noteObj.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
}); 
  }
}



export default App;
