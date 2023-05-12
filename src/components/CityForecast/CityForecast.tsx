import React, { useEffect, useRef } from 'react';
import { ICityForecast } from '../../redux/types/ICitiesWeather';
import * as d3 from 'd3';
import { Box, Typography } from '@mui/material';

interface CityForecastProps {
  data?: ICityForecast[];
}

export const CityForecast = (props: CityForecastProps) => {
  const { data } = props;

  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data) {
      createChart(data);
    }
    console.log(data);
  }, [data]);

  const createChart = (data: ICityForecast[]) => {
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const timestamps = data.map((d) => d.dt);
    const temperatures = data.map((d) => Math.round(d.main.temp));

    const minTimestamp = d3.min(timestamps)!;
    const maxTimestamp = d3.max(timestamps)!;
    const minDate = new Date(minTimestamp * 1000);
    const maxDate = new Date(maxTimestamp * 1000);

    const svg = d3.select(chartRef.current).attr('width', width).attr('height', height);

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(temperatures)!])
      .range([height - margin.bottom, margin.top]);

    const columnWidth = (width - margin.left - margin.right) / timestamps.length - 20;

    const colorScale = d3
      .scaleLinear<string>()
      .domain([-50, -1, 0, 1, 50])
      .range(['#0841D2', '#B6FFFF', '#E8F2FF', '#FFFF9F', '#FB680D'])
      .interpolate(d3.interpolateRgb);

    svg
      .selectAll('rect')
      .data(temperatures)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(new Date(timestamps[i] * 1000)) - columnWidth / 2)
      .attr('y', (temperature) => yScale(temperature))
      .attr('width', columnWidth)
      .attr('height', (temperature) => height - margin.bottom - yScale(temperature))
      .attr('fill', (temperature) => colorScale(temperature));

    svg
      .selectAll('.temperature-label')
      .data(temperatures)
      .enter()
      .append('text')
      .attr('class', 'temperature-label')
      .attr('x', (_, i) => xScale(new Date(timestamps[i] * 1000)) - columnWidth / 2)
      .attr('y', (temperature) => yScale(temperature) - 6)
      .text((temperature) => `${Math.round(temperature)}°C`)
      .attr('fill', (temperature) => (temperature < 0 ? 'blue' : 'tomato'));

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left - columnWidth / 2}, 0)`) // Adjusted y-axis transform
      .call(yAxis);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Typography variant='h4' sx={{ marginBottom: '20px' }}>
        Daily forecast
      </Typography>
      <svg ref={chartRef} />
    </Box>
  );
};
