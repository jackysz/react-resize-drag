import React, {Component} from 'react';
import './App.css';

var theobject = null;
var dir;

class App extends Component {

  resizeObject = () => {
    this.el = null; //pointer to the object
    this.dir = "";      //type of current resize (n, s, e, w, ne, nw, se, sw)
    this.grabx = null;     //Some useful values
    this.graby = null;
    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.firstLeft = null;
    this.firstTop = null;
  };

  getPositionX = (e) => {
    return e.clientX;
  };
  getPositionY = (e) => {
    return e.clientY;
  };

  getDirection = (el, e) => {
    var xPos, yPos, offset, dir;
    dir = "";
    xPos = this.getPositionX(e);
    yPos = this.getPositionY(e);
    offset = 10; //The distance from the edge in pixels
    if (yPos < el.offsetTop + offset) dir += "n";
    else if (yPos > el.offsetHeight + el.offsetTop - offset) dir += "s";
    if (xPos < el.offsetLeft + offset) dir += "w";
    else if (xPos > el.offsetWidth + el.offsetLeft - offset) dir += "e";
    return dir;
  };

  doDown = (e) => {
    var el = this.leftDiv;

    if (el == null) {
      theobject = null;
      return;
    }
    dir = this.getDirection(el, e);
    if (dir == "") return;

    theobject = new this.resizeObject();

    theobject.el = el;
    theobject.dir = dir;

    theobject.grabx = e.clientX;
    theobject.graby = e.clientY;
    theobject.width = el.offsetWidth;
    theobject.height = el.offsetHeight;
    theobject.left = el.offsetLeft;
    theobject.top = el.offsetTop;
    theobject.firstLeft = e.clientX - el.offsetLeft ;
    theobject.firstTop = e.clientY - el.offsetTop ;

    e.returnValue = false;
    e.cancelBubble = true;
  };

  doUp = () => {
    if (theobject != null) {
      theobject = null;
    }
  };

  doMove = (e) => {
    var el, str, xMin, yMin;
    xMin = 200; //The smallest width possible
    yMin = 200; //             height

    el = this.leftDiv;

    if (el.className == "resizeMe") {
      str = this.getDirection(el, e);
      if (str == "") str = "default";
      else if (str == "n") str = "pointer";
      else str += "-resize";
      el.style.cursor = str;
    }
    if (theobject != null) {
      if (dir.indexOf("e") != -1) {
        theobject.el.style.width = Math.max(xMin, theobject.width + e.clientX - theobject.grabx) + "px";
      }

      if (dir.indexOf("s") != -1)
        theobject.el.style.height = Math.max(yMin, theobject.height + e.clientY - theobject.graby) + "px";

      if (dir.indexOf("w") != -1) {
        // theobject.el.style.left = e.clientX - 100 + 'px'
        theobject.el.style.left = Math.min(e.clientX - 100, theobject.left + theobject.width - xMin - 100) + "px";
        theobject.el.style.width = Math.max(xMin, theobject.width - e.clientX + theobject.grabx) + "px";
      }
      if (dir.indexOf("n") != -1) {
        theobject.el.style.top = e.clientY - 100 + 'px'
        // console.log(e.clientX,theobject.left,theobject.el.style.left)
        console.log(theobject.firstLeft)

        theobject.el.style.left = e.clientX - 100 - theobject.firstLeft + 'px'
        
        // theobject.el.style.top = Math.min(e.clientY - 100, theobject.top + theobject.height - yMin - 100) + "px";
        // theobject.el.style.height = Math.max(yMin, theobject.height - e.clientY + theobject.graby) + "px";
      }
    }
    e.returnValue = false;
    e.cancelBubble = true;
  }


  render() {
    return (
      <div
        style={{
          width: '1000px',
          height: '500px',
          border: '1px solid #f00',
          display: 'flex',
          position:'relative'
        }}
        onMouseUp={this.doUp} onMouseMove={this.doMove}
      >
        <div className="resizeMe" style={{width: 270, height: '50%', border: '1px solid #00f',margin:'100px 100px',position:'absolute'}} ref={c => {
          this.leftDiv = c;
        }} onMouseDown={this.doDown}>
          this is the div-left
        </div>

        {/* <div style={{display: 'flex', border: '1px solid #0f0', width: '200px', height: '100%', flex: 1}}
        >
          this is div-right
        </div> */}
      </div>
    );
  }
}

export default App;
