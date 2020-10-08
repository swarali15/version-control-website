import React, {Component} from 'react';
import {storage} from '../base';
import RepoContent from './Repocontents'
import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkM from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 



class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0, 
	  itemList: null
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
	  
	  this._onButtonClick = this._onButtonClick.bind(this);
  }
  
  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }
  
     handleFolderOpen = () => {
  const storageRef = storage.ref();

    // const storageRef = firebase.storage().ref(this.state.folderRef);
  storageRef.listAll().then( res => {
     // for files like images

     const itemList = []

     res.items.forEach( item => {

        itemList.push(item)

     })
     this.setState({ itemList: itemList})
  })

}

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
      console.log(e.target.files[0])
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
		
    });
  }
  
  render() {
    
    return (
      <div  >
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange} style={{color:"brown"}}/>
        <button onClick={this.handleUpload}>Upload</button>
        <br/>
        
		<Button onClick={this._onButtonClick}>Button</Button>
        {this.state.showComponent ?
           <Test url={this.state.url} /> :
           null
        }
		
		 <Button
          onClick={this.handleFolderOpen}
          className="waves-effect waves-light btn"
        >
          View pdf
        </Button>
      </div>
	  



    )
  }
}



//Child class test here View pdf
function Test(props) { 
		const url=(props);
		console.log(url)
        pdfjs.GlobalWorkerOptions.workerSrc = 
       `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
       const [numPages, setNumPages] = useState(null); 
       const [pageNumber, setPageNumber] = useState(1); 
	   

       /*To Prevent right click on screen*/
        
  
        
       /*When document gets loaded successfully Add comment close here..............(*/
       function onDocumentLoadSuccess({ numPages }) { 
        setNumPages(numPages); 
        setPageNumber(1); 
       } 

       function changePage(offset) { 
        setPageNumber(prevPageNumber => prevPageNumber + offset); 
       } 

       function previousPage() { 
        changePage(-1); 
       } 

       function nextPage() { 
        changePage(1); 
       } 

       return ( 
        <> 
        <div className="main"> 
        <Document 
         file={url} 
         onLoadSuccess={onDocumentLoadSuccess} 
        > 
         <Page pageNumber={pageNumber} /> 
        </Document> 
        <div> 
            <div className="pagec"> 
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
            </div> 
            <center>
               <div className="buttonc"> 
               <button 
               type="button"
               disabled={pageNumber <= 1} 
               onClick={previousPage} 
               className="Pre"
                
               > 
               Previous 
               </button> 
               <button 
               type="button"
               disabled={pageNumber >= numPages} 
               onClick={nextPage} 
               
               > 
               Next 
               </button> 
               </div> </center>
        </div> 
        </div> 
        </> 
       ); 
       }


export default ImageUpload;