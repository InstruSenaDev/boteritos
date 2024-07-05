import React from "preact/compat";

import { VictoryPie } from "victory";

const dataLogros = [{ x: "LP", y: "4" }, { x: "LA", y: "5" }, { x: "LN", y: "2" }];

const GraphicPie = () => {
  return (
    <>
      <VictoryPie
        data={[
          { x: "Cats", y: 35 },
          { x: "Dogs", y: 40 },
          { x: "Birds", y: 55 }
        ]}
      />

    </>
  );
}

export default GraphicPie;