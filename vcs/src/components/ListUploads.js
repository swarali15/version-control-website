import React from 'react';
import {Table, Button} from 'react-bootstrap';
import firebase, {storageRef } from '../base';
import {storage} from '../base';


class FileRetrieval extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      folderList: null,
      folderRef: null,
      itemList: null,
      folderRename: null,
      download: null,
      image: "image",
      pdf: "pdf",
      word: "word",
    }
  }

  componentDidMount() {

  } 
  handleClick = (e) => {
      e.preventDefault();
  
      const folderRename = []
  
      this.setState({
        folderRename: e.target.value
       
       });
  
    
    }
    
   handleFolderOpen = () => {
  const storageRef = storage.ref();

   
  storageRef.listAll().then( res => {
     // for files like images

     const itemList = []

     res.items.forEach( item => {

        itemList.push(item)

     })
     this.setState({ itemList: itemList})
  })

}
  
render() {

    return(
        <div>

    <Button
          onClick={this.handleFolderOpen}
          className="waves-effect waves-light btn"
        >
          Show Uploaded Files
        </Button>

    
    

    <Table striped bordered hover variant="dark" >
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Download URL</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
	  
	  
    { 
      this.state.itemList &&
      this.state.itemList.map( (itemName, index ) => {
		  console.log(itemName)
      return(

        
          
      
        <tr>
         <td> {index + 1}</td>
         <td> {itemName.name}</td>
         <td>{this.state.download}</td>
         <td> 
        <input
          type="button"
          defaultValue={itemName.name}
          onClick={this.handleClick}
        /> </td>
        
          </tr>
      
      
      )
    })}

{ 
      this.state.download &&
      this.state.download.map( (downloadLink ) => {
      return(

        <h1>{downloadLink.url}</h1>

      )
      }

      )}

</tbody>
      </Table>

        </div>
    )
}
}

export default FileRetrieval;