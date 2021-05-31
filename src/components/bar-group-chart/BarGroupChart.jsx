import React from 'react';
import { Group } from '@visx/group';
import { BarGroup, BarStack } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { localPoint } from '@visx/event';
import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from '@visx/tooltip';
import { timeParse, timeFormat } from 'd3-time-format';
import { format } from 'date-fns';
import { Tooltip } from './Tooltip';

const defaultMargin = { top: 30, right: 5, bottom: 40, left: 40 };

const blue = '#aeeef8';
const green = '#e5fd3d';
const purple = '#9caff6';
const axisColor = '#777';
const gridColor = '#bbb';

const parseDate = timeParse('%Y-%m-%d');
// const format = timeFormat('%b %d');
const formatDate = (date) => format(parseDate(date));

export function BarGroupChart({
  data = cityTemperature.slice(0, 40),
  width,
  height,
  events = false,
  margin = defaultMargin,
  isBarTypeStack,
  colors,
}) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();
  console.log(tooltipData);
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  const keys = Object.keys(data[0]).filter((d) => d !== 'date');

  // accessors
  const getDate = (d) => format(new Date(d.date), 'dd, MM, yyyy');

  // scales
  const dateScale = scaleBand({
    domain: data.map(getDate).reverse(),
    padding: 0.2,
  });
  const categoryScale = scaleBand({
    domain: keys,
    padding: 0.1,
  });
  const sumScale = scaleLinear({
    domain: [
      0,
      isBarTypeStack
        ? Math.min(
            ...data.reduce((acc, d) => {
              const daySum = keys.reduce((sum, key) => {
                return sum + d[key];
              }, 0);
              acc.push(daySum);
              return acc;
            }, [])
          )
        : Math.min(
            ...data.map((d) => Math.min(...keys.map((key) => Number(d[key]))))
          ),
    ],
  });
  const colorScale = scaleOrdinal({
    domain: keys,
    range: keys.map((item) => {
      return colors[item];
    }),
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  categoryScale.rangeRound([0, dateScale.bandwidth()]);
  sumScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="none"
          // rx={14}
        />
        <GridRows
          top={margin.top}
          left={margin.left}
          // scale={dateScale}
          // width={xMax}
          // height={yMax}
          // stroke="black"
          // strokeOpacity={0.1}
          // xOffset={dateScale.bandwidth() / 2}
          // numTicks={10}
          // left={margin.left}
          scale={sumScale}
          width={xMax - margin.right}
          height={yMax}
          // strokeDasharray="1,3"
          stroke={gridColor}
          strokeOpacity={0.5}
          // pointerEvents="none"
        />
        <Group top={margin.top} left={margin.left}>
          {!isBarTypeStack && (
            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={getDate}
              x0Scale={dateScale}
              x1Scale={categoryScale}
              yScale={sumScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        // rx={2}
                        onMouseMove={(event) => {
                          // const coords = localPoint(
                          //   event.target.ownerSVGElement,
                          //   event
                          // );

                          const eventSvgCoords = localPoint(event);
                          const left = bar.x + bar.width / 2;
                          showTooltip({
                            // tooltipLeft: coords.x,
                            // tooltipTop: coords.y,
                            tooltipTop: eventSvgCoords?.y + 110,
                            tooltipLeft: left + 30,
                            tooltipData: bar,
                          });
                        }}
                        onMouseLeave={() => {
                          hideTooltip();
                        }}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
          )}
          {isBarTypeStack && (
            <BarStack
              data={data}
              keys={keys}
              x={getDate}
              xScale={dateScale}
              yScale={sumScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                      onMouseMove={(event) => {
                        // const coords = localPoint(
                        //   event.target.ownerSVGElement,
                        //   event
                        // );

                        const eventSvgCoords = localPoint(event);
                        const left = bar.x + bar.width / 2;
                        showTooltip({
                          // tooltipLeft: coords.x,
                          // tooltipTop: coords.y,
                          tooltipTop: eventSvgCoords?.y + 110,
                          tooltipLeft: left + 30,
                          tooltipData: bar,
                        });
                      }}
                      onMouseLeave={() => {
                        hideTooltip();
                      }}
                    />
                  ))
                )
              }
            </BarStack>
          )}
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          // tickFormat={formatDate}
          scale={sumScale}
          stroke={axisColor}
          tickStroke={axisColor}
          // hideAxisLine
          // tickLabelProps={() => ({
          //   fill: axisColor,
          //   fontSize: 11,
          //   textAnchor: 'middle',
          // })}
        />
        <AxisBottom
          top={yMax + margin.top + 5}
          left={margin.left}
          // tickFormat={formatDate}
          scale={dateScale}
          stroke={axisColor}
          tickStroke={axisColor}
          hideAxisLine
          // tickLabelProps={() => ({
          //   fill: axisColor,
          //   fontSize: 11,
          //   textAnchor: 'middle',
          // })}
        />
      </svg>
      {tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <Tooltip barData={tooltipData.bar.data} />
        </TooltipInPortal>
      )}
    </div>
  );
}
