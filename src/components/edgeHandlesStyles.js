export default [
  {
    selector: ".eh-handle",
    style: {
      "background-color": "#0e76ba",
      width: 12,
      height: 12,
      shape: "ellipse",
      "overlay-opacity": 0,
      "border-width": 12,
      "border-opacity": 0
    }
  },
  {
    selector: ".eh-source",
    style: {
      "border-width": 4,
      "border-color": "#0e76ba"
    }
  },
  {
    selector: ".eh-target",
    style: {
      "border-width": 2,
      "border-color": "#0e76ba"
    }
  },
  {
    selector: ".eh-preview, .eh-ghost-edge",
    style: {
      "background-color": "#0e76ba",
      "line-color": "#0e76ba",
      "line-style": "dashed",
      "target-arrow-color": "#0e76ba",
      "source-arrow-color": "#0e76ba"
    }
  },
  {
    selector: ".eh-ghost-edge.eh-preview-active",
    style: {
      opacity: 0
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
  }
];
