import React from 'react';
import * as d3 from 'd3';
import D3V5Axis from './D3V5';
import TLAxis from './TLAxis'

const parser = d3.isoParse;

const Timeline = ({data}) => {

    const minDate = d3.min(data, function(d) {
        return parser(d.start_date);
      });
    const maxDate = d3.max(data, function(d) {
        return parser(d.end_date);
      });
    console.log(minDate, maxDate)

    const xScale = 
        d3.scaleTime()
        .domain([minDate,maxDate])
        .range([0, 900]);
    
    console.log(xScale.range())

    return (
      // <TLAxis 
      //   data={data}          
      //   domain={xScale.domain()}
      //   range={xScale.range()} 
      //   height="125"
      //   width="900"
      // />
      <D3V5Axis 
      data={data}          
        domain={xScale.domain()}
        range={xScale.range()} 
        // height ="250"
        // width="900"
      />
    )
}

export default Timeline;