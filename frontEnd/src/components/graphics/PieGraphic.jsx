import React from "preact/compat";
import { Pie } from "@nivo/pie";

export default function PieGraphic
() {
  const data = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
  ];
  //<Pie {...commonProperties} innerRadius={0.8} enableArcLabels={false} arcLinkLabel={d => `${d.id} (${d.formattedValue})`} activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset} layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]} />
  //activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
  return (
    <Pie
      data={data}
      innerRadius={0.8}
      enableArcLabels={false}
      arcLinkLabel={(d) => `${d.id} (${d.formattedValue})`}
      layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredMetric]}
    />
  );
}
