import React, { Component } from 'react'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default class MemeGenerator extends Component {

constructor(){
    super();
    this.state={
        topText:"",
        bottomText:"",
        randomImg:"https://media.istockphoto.com/id/1180219262/photo/portrait-of-a-funny-raccoon-in-red-sunglasses-showing-a-rock-gesture-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=qRDnURRQzS42DB8mCYxCMe9bfv8-UE2UpvQclK2j5VM=", // default image
        allMemeImgs:[]
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDownload=this.handleDownload.bind(this);
}

componentDidMount(){
    fetch("https://api.imgflip.com/get_memes").then(response=> response.json())
    .then ( response => {
        const {memes}=response.data
        this.setState({allMemeImgs:memes})
    })
}

handleChange(event){
 const {name, value}=event.target;
 this.setState({
    [name]:value
 })
}

handleSubmit(event){
    event.preventDefault();
    const randNum=Math.floor(Math.random()* this.state.allMemeImgs.length)
    const randmemeImg=this.state.allMemeImgs[randNum].url
    this.setState({randomImg:randmemeImg})
}

handleDownload(event) {
    event.preventDefault();
    const node = document.getElementsByClassName('meme')[0];
    domtoimage.toBlob(node)
        .then(blob => {
            saveAs(blob, 'my-meme.png');
        });
}

render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
         <input className='in' type="text" name='topText' placeholder='Top Text'  value={this.state.topText} onChange={this.handleChange}/>
         <input className='in' type="text"  name='bottomText' placeholder='Bottom Text' value={this.state.bottomText}  onChange={this.handleChange}/>
         <button className='btn'>Generate</button>
        </form>
        <div className='meme'>
          <img className='res' src={this.state.randomImg} alt="Please Generate Image!" />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
        <br/>
        <button className='btn1'  onClick={this.handleDownload}>Download</button>
      </div>
    )
  }
}