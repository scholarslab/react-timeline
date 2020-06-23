import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import './Timeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const D3V5Axis = ({data, domain, range, 
    // height,
    // width
}) => {
    const ref = useRef()

    useEffect(() => {
    const x = d3.scaleTime()
        .domain(domain)
        .range(range)
        .nice();

    const items = d3.nest().key(function(d) {
        return d.tir;
      }).entries(data);
      console.log(items)

    const zoom = d3.zoom()
        // .scaleExtent([0.5, 32])
        .on("zoom", zoomed);

    const svg = d3.select(ref.current)
        // .attr('width', width)
        // .attr('height', height)

    const parser = d3.isoParse;

    const spanX = function(data) {
    return x(parser(data.start));
    };
    
    const spanW = function(data) {
    return x(parser(data.end)) - x(parser(data.start));
    };
    
    const chart = function(item) {
        const svg = d3.select(this);
        return svg.selectAll('rect')
            .data(item.values).enter()
            .append('rect')
            .attr('x', d => spanX(d))
            .attr('y', 0).attr('width', d => spanW(d))
            .attr('height', "16px")
            .attr('fill', '#ddf')
            .style("cursor", "pointer")
            .on("click", d=>console.log('start: ' + d.start + ' end: ' + d.end))
    };
    
    const allCharts = d3.select('.tl-main')
        .selectAll('svg')
        .data(items)
        .enter().append('svg')
        .attr('height', 16)
        .each(chart);

    const gx = svg.append("svg");

    const buttonReset = d3.select("#reset")
    const buttonZoomIn = d3.select("#zoomIn")
    const buttonZoomOut = d3.select("#zoomOut")

    // const xAxisY = height - 25;

    const xAxis = (g, x) => g
        // .attr("transform", `translate(0,${height})`)
        .attr("transform", `translate(45,0)`)
        .attr("color", "#737373")
        .attr("height", "22px")
        .style("padding-top", "16px")
        .style('font-size', '12px')
        // .style("bottom", 0)
        .call(d3.axisBottom(x).ticks(12)
        // .tickSize(-height)
        )
        .call(g => g.select(".domain").attr("display", "none")) //"none" to hide axis line
        // .call(g => g.selectAll(".tick").selectAll("line").attr("stroke", "white"))

    function zoomed() {
        const transform = d3.event.transform;
        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        gx.call(xAxis, zx);
        return allCharts.selectAll('rect').attr('x', function(d) {
            return transform.applyX(spanX(d));
          }).attr('width', function(d) {
            return transform.k * spanW(d);
          });
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
        <div className="neatline-timeline">
        <div className="tl-controls">
            <span id="zoomIn" className="tl-controls-button">
            <FontAwesomeIcon icon="search-plus" />
            </span>
            <span id="zoomOut" className="tl-controls-button">
            <FontAwesomeIcon icon="search-minus" />
            </span>
            <span id="reset" className="tl-controls-button">
            <FontAwesomeIcon icon="undo-alt" />
            </span>

        </div>
        <div
            className="tl-main"
            ref={ref}
        />
        </div>
    )
  }

export default D3V5Axis;