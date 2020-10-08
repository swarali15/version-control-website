import React, { Component } from 'react';
import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

const file = 'https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2FSDP%20Weekly%20progress%20(2).docx?alt=media&token=3dac5e70-0611-4d60-bc07-fd9217d4c92a'
const type = 'docx'
const fileJpg='https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2FWhatsApp%20Image%202020-09-13%20at%208.23.06%20PM.jpeg?alt=media&token=be39e551-d12a-4b8f-b82c-2d3b932419af'
const typeJPG='jpeg'
const filepdf='https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2FICECOCS18_paper_9.pdf?alt=media&token=5a3e4bb6-2df7-4bf2-8d0c-7c22f37ca24e'
const typePDF='pdf'
const filemp3='https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2Fbensound-anewbeginning.mp3?alt=media&token=b0977ff8-f4a9-4280-bc87-f689fa933c5c'
const typeMP3='mp3'
const filevid='https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2FVideo_20200321123346830_by_Videomaker.mp4?alt=media&token=e08e2d18-82ff-4d04-afee-1cd4c54f7464'
const typevid='mp4'
const fileexcel='https://firebasestorage.googleapis.com/v0/b/version-control-website.appspot.com/o/images%2FELEMENTARY%20-INTERMEDIATE%20DRAWING%20GRADE%20EXAMINATION-2018.xlsx?alt=media&token=e3c9b521-57a9-4f83-b936-6a5f43f8f5e0'
const typexslc='xlsx'
class MyComponent extends Component {
  render() {
    return (
	<div>
	<center><p>docx</p></center>
      <center><FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/></center>
		<center><p>images</p></center>
		<center><FileViewer
        fileType={typeJPG}
        filePath={fileJpg}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/></center>
		<center><p>pdfs</p></center>
		<center><FileViewer
        fileType={typePDF}
        filePath={filepdf}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
		<center><p>mp3</p></center>
		<FileViewer
        fileType={typeMP3}
        filePath={filemp3}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
		<center><p>mp4</p></center>
		<FileViewer
        fileType={typevid}
        filePath={filevid}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
		<center><p>xlsx</p></center>
		<FileViewer
        fileType={typexslc}
        filePath={fileexcel}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/></center>
		
		</div>
    );
  }

  onError(e) {
    console.log(e, 'error in file-viewer');
  }
}
export default MyComponent

