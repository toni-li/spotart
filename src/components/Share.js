import React, { Component } from 'react';

import section1 from '../ex-section1.png';
import section2 from '../ex-section2.png';
import section3 from '../ex-section3.png';
import section4 from '../ex-section4.png';
import section5 from '../ex-section5.png';


class Share extends Component {
  render() {
    // window.addEventListener('load', (event) => {
    //   var numSections = 5;
    //   var numRows = Math.ceil(numSections/2);
    //   var table = document.getElementById("resultTable");
    //   for (var i = 1; i <= numRows; i++) {
    //       var tr = document.createElement('tr');
    //       var cell1 = document.createElement('td');
    //       var cell2 = document.createElement('td');
    //       var img1 = document.createElement('img');
    //       var img2 = document.createElement('img');
    //       input1.type = "text";
    //       input2.type = "text";
    //       input1.placeholder = "Text goes here...";
    //       input2.placeholder = "Text goes here...";
    //       cell1.appendChild(input1);
    //       cell2.appendChild(input2);
    //       tr.appendChild(cell1);
    //       tr.appendChild(cell2);
    //       table.appendChild(tr);
    //   }


    // });
    return (
      <div id="sharePage">
        <div id="share-info">
            <p id="buffer"> buffer</p>
            <p> {localStorage.getItem("trackName")} </p>
            <p> {localStorage.getItem("trackArtist")} - {localStorage.getItem("trackAlbum")} </p>
        </div>

        <table id="resultTable">
          <tr>
            <td> <img id="table-img" src={section1} alt="section" /> </td>
            <td> <img id="table-img" src={section2} alt="section" /> </td>
          </tr>
          <tr>
            <td> <img id="table-img" src={section3} alt="section" /> </td>
            <td> <img id="table-img" src={section4} alt="section" /> </td>
          </tr>
          <tr>
            <td> <img id="table-img" src={section5} alt="section" /></td>
            <td> </td>
          </tr>
        </table>
        
      </div>

    )
  }
}

export default Share;