export default ({ onComplete, onCancel }) => ({
  preview: true, // whether to show added edges preview before releasing selection
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  handleNodes: "node", // selector/filter function for whether edges can be made from a given node
  snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 20, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  handleInDrawMode: false, // whether to show the handle in draw mode
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  handlePosition: (_node) => "middle middle",
  edgeType: (_sourceNode, _targetNode) => "flat",
  loopAllowed: (_node) => true,
  complete: onComplete,
  cancel: onCancel,
  start: (sourceNode) => sourceNode.cy().elements().unselect()
});
