import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var wordList = require('../../json/wordList.json');

const App = React.createClass({
  displayname: 'App',

  getInitialState() {
      return { divShown: false, text : "", wordError:false, paragraphError:false };
  },
render(){

  return(

<div className="full-width">
  <div className="blackground">

    <div className="container">

        <div className="content">

            <img src="/img/OPD-Logo.png"></img>

            <h1>Panda Lorem Ipsum</h1>
            <h3>Add wonderful Panda Lorem Ipsum to your project</h3>

            <div className="form" >

                <div className="row">

                    <div className="form-group col-md-4">
                        <input type="number" min='0' name="words" id=  "numberOfWords" placeholder="Total Words"></input>
                          { this.state.wordError ? <GenericError /> : null }
                    </div>

                    <div className="form-group col-md-4">
                        <input type="number" min='0' name="paragraphs" id="numberOfParagraphs" placeholder="Paragraphs"></input>
                          { this.state.paragraphError ? <GenericError /> : null }
                    </div>

                    <div className="button col-md-4">
                        <button id="button" className="event-button" onClick={this.displayWords}>Submit</button>
                        <p>
                          <a className="transition" id="scrollFire" href="#scroll"></a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
        <p id="year">Created by <a href="http://www.oddpandadesign.co.uk/" target="_blank">Odd Panda Design</a> &#169; 2016</p>
    </div>
  </div>
  { this.state.divShown ? <Reveal text={this.state.text}/> : null }
</div>

    )
  },


    displayWords: function(props){

      this.setState({ divShown: true})

      var words = wordList.words;

      var pandaWords =  {words}

      var j=document.getElementById("numberOfWords").value
      var k=document.getElementById("numberOfParagraphs").value

      if (isNaN(j) || j < 1) {
        return this.setState({ wordError: true });
      } else{
        this.setState({ wordError: false })
      }


      if (isNaN(k) || k < 1) {
        return this.setState({ paragraphError: true });
      } else{
        this.setState({ paragraphError: false })
      }



      //setting variables
      var text ="";
      var i;

      new Clipboard('.btn');

      //Find which words to break on for paragraph
      var breakEveryX = (j/k)
      var wordCount = 0

      //Random words being generated from list
      for (i = 0; i < j; i++){

        //Count how many words have been processed
        wordCount++

        //Select random word from array
        var randomPanda = pandaWords[Math.floor(Math.random() * pandaWords.length)];

        //Depending on wordCount add line break or empty space
        var appendText =  (wordCount >= breakEveryX) ? "\n\n"  : " "
        text =  text + randomPanda + appendText

        //Add or reset Wordcount if the correct amount of words have been processed
        if (wordCount >= breakEveryX) {
          wordCount = 0
        }


      }

      this.setState({text : text})

      //scrolling to bottom
      document.getElementById('scrollFire').click();

    },
});

export default App;

export var Reveal = React.createClass({
  displayName: 'Reveal',
  render: function(){
    return(
          <div className="reveal" id="show">
              <div className="container footer">
                  <h2>And the result...</h2>
                  <div className="generatedText">
                  <p id="showWords">{this.props.text}</p>

                    <button className="btn" data-clipboard-target="#showWords">
                        <img src="assets/clippy.svg" alt="Copy to clipboard"/>
                    </button>
                  </div>
                    <a href="http://twitter.com/intent/tweet?text=Look+at+this+panda-based+lorem-ipsum+generator.+Good+shit+right+here+@oddpandadesign+oddpandadesign.com" target="_blank" className="icon-button twitter"><i className="fa fa-twitter"></i><span></span></a>
                    <a href="http://www.facebook.com/sharer.php?src=sp&u=http%3A%2F%2Fwww.myDomain.com%2Fpath%2F" target="_blank"className="icon-button facebook"><i className="fa fa-facebook"></i><span></span></a>
                    <a href="http://plus.google.com " target="_blank" className="icon-button google-plus"><i className="fa fa-google-plus"></i><span></span></a>


                <div className ="credits">

                <img id="scroll" src="./img/OPD-logo-white.png"></img>
                  <h4>A project by oddpandadesign.com</h4>
                  <p>For updates follow us on <a href="https://www.facebook.com/OddPandaDesign" target="_blank">Facebook</a>, <a href="https://twitter.com/oddpandadesign" target="_blank">Twitter</a>,
                     and <a href="https://www.instagram.com/oddpandadesign/" target="_blank">Instagram</a></p>
                </div>
              </div>
          </div>
    )
  }
});
export var GenericError = React.createClass({
 displayName: 'GenericError',

 render: function(){
   return(
     <div className="errorMessage">
       <p>Please input any number greater than 0</p>
     </div>
   );
 }
});

//Not strictly best practice with React
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });
});
