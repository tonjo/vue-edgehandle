export default (nodeInnerLabelField, edgeLabelField) => [
  {
    selector: "core",
    style: {
      "selection-box-opacity": 0,
      "active-bg-opacity": 0
    }
  },
  {
    selector: "node",
    style: {
      content: nodeInnerLabelField ? `data(${nodeInnerLabelField})` : "",
      width: "50",
      height: "50",
      "font-size": 18,
      "font-weight": "bold",
      // Pie chart inside nodes
      // 'pie-size': '45px',
      // 'pie-1-background-color': '#ebf4f9',
      // 'pie-1-background-size': '70',
      "text-margin-y": 1,
      "text-valign": "center",
      "text-wrap": "wrap",
      "text-max-width": 140,
      "background-color": "#fff",
      "border-color": "#98c7e1",
      "border-width": 3,
      color: "#0e76ba"
    }
  },
  {
    selector: "node.simple",
    style: {
      content: "",
      // 'pie-size': 0,
      "text-margin-y": 1,
      "background-color": "#838383",
      "border-color": "#838383"
    }
  },
  {
    selector: "node:selected",
    style: {
      "border-width": 4,
      "border-color": "#0e76ba",
      "pie-1-background-color": "#cbe3f0",
      "background-color": "#ebf4f9"
    }
  },
  {
    selector: "node.simple:selected",
    style: {
      "border-color": "#838383",
      "background-color": "#838383"
    }
  },
  {
    selector: "edge",
    style: {
      content: edgeLabelField ? `data(${edgeLabelField})` : "",
      "curve-style": "bezier",
      "text-outline-color": "#f00",
      color: "#0e76ba",
      "text-background-color": "#ffffff",
      "text-background-opacity": 1,
      "text-background-padding": 3,
      width: 3,
      "target-arrow-shape": "triangle",
      "line-color": "#98c7e1",
      "target-arrow-color": "#98c7e1",
      "font-weight": "bold"
    }
  },
  {
    selector: "edge.virtual",
    style: {
      "curve-style": "unbundled-bezier",
      "control-point-distances": [-20, -40, -20],
      "control-point-weights": [0.1, 0.5, 0.9],
      "line-color": "#ff9739",
      "line-style": "dashed",
      width: 2,
      opacity: 0.6,
      "target-arrow-color": "#ff9739"
    }
  },
  {
    selector: "edge.virtual-even",
    style: {
      "control-point-distances": [20, 40, 20]
    }
  },
  {
    selector: "edge.self",
    style: {
      "curve-style": "bezier"
    }
  },
  {
    selector: "edge:selected",
    style: {
      "line-color": "#0e76ba",
      "target-arrow-color": "#0e76ba",
      width: 4
    }
  },
  {
    selector: "edge.simple",
    style: {
      content: "",
      "line-color": "#838383",
      "target-arrow-color": "#838383",
      width: 4
    }
  },
  {
    selector: ".head",
    style: {
      "border-color": "green"
    }
  },
  {
    selector: ".startable",
    style: {
      "border-color": "#33cc4c"
    }
  },
  {
    selector: ".head_select",
    style: {
      "border-color": "#87248c"
    }
  }
];
