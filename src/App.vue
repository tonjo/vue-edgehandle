<template>
  <div
    id="app"
    style="
      width: 600px;
      height: 400px;
      background: transparent;
      border: 1px dashed gray;
    "
  >
    <AppGraph
      ref="graph"
      theme="default"
      :nodes="nodes"
      :edges="edges"
      @cancel-edge="onCancelEdge"
    />
  </div>
</template>

<script>
import AppGraph from "./components/AppGraph";
import { uuid } from "uuidv4";

export default {
  name: "App",
  components: {
    AppGraph,
  },
  data() {
    return {
      nodes: [
        {
          name: "Workflow B",
          id: "bb8c9a6d-c23f-44ac-b6e1-a89d1d230e18",
        },
      ],
      edges: [],
    };
  },
  methods: {
    async onCancelEdge(sourceNode) {
      const newNodeId = uuid();
      const newEdgeId = uuid();

      // Wait next render for tapEndPosition
      await this.$nextTick();
      const nodePosition = this.$refs.graph.tapEndPosition;

      const newEdge = {
        id: newEdgeId,
        source: `${sourceNode.id}`,
        target: `${newNodeId}`,
      };

      this.$refs.graph.cyInstance.add({
        group: "nodes",
        data: {
          id: `${newNodeId}`,
          uuid: `${newNodeId}`,
        },
        position: nodePosition,
      });
      this.$refs.graph.cyInstance.add({ group: "edges", data: newEdge });
    },
  },
};
</script>

<style>
</style>
