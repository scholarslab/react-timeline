import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import './Timeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const D3V5Axis = ({domain, range, height, width}) => {
    const ref = useRef()

    useEffect(() => {
    const x = d3.scaleTime()
        .domain(domain)
        .range(range)
        .nice();

    const zoom = d3.zoom()
        // .scaleExtent([0.5, 32])
        .on("zoom", zoomed);

    const svg = d3.select(ref.current)
        .attr('width', width)
        .attr('height', height)

    const gx = svg.append("g");

    const buttonReset = d3.select("#reset")
    const buttonZoomIn = d3.select("#zoomIn")
    const buttonZoomOut = d3.select("#zoomOut")

    const xAxisY = height - 45;

    const xAxis = (g, x) => g
        // .attr("transform", `translate(0,${height})`)
        .attr("transform", `translate(45,${xAxisY})`)
        .attr("color", "#737373")
        .style('font-size', '12px')
        // .attr('class', 'tl-timenav')
        .call(d3.axisBottom(x).ticks(12).tickSize(-height))
        .call(g => g.select(".domain").attr("display", "none")) //"none" to hide axis line
        .call(g => g.selectAll(".tick").selectAll("line").attr("stroke", "white"))

    function zoomed() {
        const transform = d3.event.transform;
        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        gx.call(xAxis, zx);
       
      }
    
    function reset() {
        svg.transition()
            .duration(1000)
            .call(zoom.transform, d3.zoomIdentity);
      }
    //   https://observablehq.com/@d3/programmatic-zoom
    function zoomIn() {svg.transition().call(zoom.scaleBy, 2);}
    function zoomOut() {svg.transition().call(zoom.scaleBy, 0.5);}
      
    buttonReset.on("click", reset);
    buttonZoomIn.on("click", zoomIn);
    buttonZoomOut.on("click", zoomOut);
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);
    }, [])
  
    return (
        <>
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
        <svg
            className="tl-timenav"
            ref={ref}
        />
        </>
    )
  }

export default D3V5Axis;