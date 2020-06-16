import React from 'react';
import * as d3 from 'd3';
import D3V5Axis from './D3V5';

const parser = d3.isoParse;

const Timeline = ({data}) => {

    const minDate = d3.min(data, function(d) {
        return parser(d.start);
      });
    const maxDate = d3.max(data, function(d) {
        return parser(d.end);
      });
    console.log(minDate, maxDate)

    const xScale = 
        d3.scaleTime()
        .domain([minDate,maxDate])
        .range([0, 900]);
    
    console.log(xScale.range())

    return (
      <D3V5Axis           
        domain={xScale.domain()}
        range={[0,900]} //need to get this working to resize correctly
        height="200"
        width="900"
      />
    )
}

export default Timeline;