import React, {useEffect} from 'react';
import * as d3 from 'd3';
import './Timeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TLControls = ({reset, zoomIn, zoomOut}) => {
    // const ref = ref;
    // const zoom = d3.zoom()
    //     // .scaleExtent([0.5, 32])
    //     .on("zoom", zoomed);

    // const svg = d3.select(ref.current);


    const buttonReset = d3.select("#reset")
    const buttonZoomIn = d3.select("#zoomIn")
    const buttonZoomOut = d3.select("#zoomOut")
    
    // function reset() {
    //     svg.transition()
    //         .duration(1000)
    //         .call(zoom.transform, d3.zoomIdentity);
    //   }
    // //   https://observablehq.com/@d3/programmatic-zoom
    // function zoomIn() {svg.transition().call(zoom.scaleBy, 2);}
    // function zoomOut() {svg.transition().call(zoom.scaleBy, 0.5);}
      
    buttonReset.on("click", reset);
    buttonZoomIn.on("click", zoomIn);
    buttonZoomOut.on("click", zoomOut);
  
    return (
        <div className="timeline-controls">
            <span id="zoomIn" className="tl-menubar-button">
            <FontAwesomeIcon icon="search-plus" />
            </span>
            <span id="zoomOut" className="tl-menubar-button">
            <FontAwesomeIcon icon="search-minus" />
            </span>
            <span id="reset" className="tl-menubar-button">
            <FontAwesomeIcon icon="undo-alt" />
            </span>

        </div>
    )
  }

export default TLControls;