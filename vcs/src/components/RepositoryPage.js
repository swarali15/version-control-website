import React, { Component } from "react";
import UploadService from "../services/upload-files.service.js ";

export default class RepositoryPage extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}



/*import axios from 'axios'; 

import React,{Component} from 'react'; 

class RepositoryPage extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
	// Send formData object 
	axios.post("api/uploadfile", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	}; 
	
	render() { 
	
	return ( 
		<div> 
			 
			<h3> 
			Upload  File 
			</h3> 
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
				<button onClick={this.onFileUpload}> 
				Upload
				</button> 
			</div> 
		{this.fileData()} 
		</div> 
	); 
	} 
} 

export default RepositoryPage; 

*/