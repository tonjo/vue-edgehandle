<template>
  <div :style="graphElementStyles"></div>
</template>

<script>
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import edgehandles from "cytoscape-edgehandles";
import nodeHtmlLabel from "cytoscape-node-html-label";

import defaultGraphStyles from "./defaultGraphStyles";
import edgeHandlesStyles from "./edgeHandlesStyles";
import edgeHandlesConfig from "./edgeHandlesConfig";

export default {
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    edges: {
      type: Array,
      required: true,
    },
    nodeInnerLabelField: {
      type: String,
    },
    nodeOutterLabelField: {
      type: String,
    },
    edgeLabelField: {
      type: String,
    },
  },
  data() {
    return {
      divHeight: 0,
      divWidth: 0,
      tapEndPosition: null,
      maxNameLength: 14,
    };
  },
  computed: {
    graphElementStyles() {
      return {
        width: "500px",
        height: "400px",
      };
    },
    graphEdges() {
      return this.edges;
    },
    graphNodes() {
      return this.nodes;
    },
  },
  watch: {
    nodes() {
      this.renderGraph();
    },
    edges() {
      this.renderGraph();
    },
  },
  methods: {
    renderGraph() {
      if (this.cyInstance) {
        // Avoid memory leaks
        this.cyInstance.destroy();
      }

      // Simple is used in Project view
      // View Only is used in the Add Experiment modal (and when expanding project in Project list)
      // Edit is used by the builder
      const spacingFactor = 1.2;

      this.cyInstance = cytoscape({
        container: this.$el,

        elements: {
          nodes: this.graphNodes,
          edges: this.graphEdges,
        },

        style: [
          // Default styles (passing label field names)
          //
          ...defaultGraphStyles(this.nodeInnerLabelField, this.edgeLabelField),

          // Edge handlers styles (if needed, only when graph is editable)
          //
          ...edgeHandlesStyles,
        ],

        ready: (event) => {
          event.cy.fit(event.cy.elements(), 30);
          event.cy.zoom(0.75);
        },

        layout: {
          name: "dagre",
          rankDir: "LR",
          fit: this.theme === "simple" || this.viewOnly,
          ranker: "longest-path",
          directed: true,
          nodeSep: this.theme !== "simple" && !this.viewOnly ? 80 : 50,
          spacingFactor: spacingFactor,
          padding: this.theme !== "simple" && !this.viewOnly ? 220 : 0,
        },
      });

      // These configs probably need to be set by a prop
      this.cyInstance.boxSelectionEnabled(true);
      this.cyInstance.userPanningEnabled(true);
      this.cyInstance.autolock(false);

      if (this.theme !== "simple") {
        if (
          !Object.getPrototypeOf(this.cyInstance).hasOwnProperty(
            "nodeHtmlLabel"
          )
        ) {
          nodeHtmlLabel(cytoscape);
        }
        this.cyInstance.nodeHtmlLabel([
          {
            query: "node",
            valign: "bottom",
            halign: "center",
            valignBox: "bottom",
            halignBox: "center",
            tpl: (data) =>
              data[this.nodeOutterLabelField]
                ? `<div class="app-graph--outter-label">
                 ${data[this.nodeOutterLabelField]}
               </div>`
                : "",
          },
        ]);
      }

      // Avoid multiple selection
      //

      const config = edgeHandlesConfig({
        onComplete: (sourceNode, targetNode, addedEles) => {
          this.$emit("create-edge", addedEles.data());
        },
        onCancel: (sourceNode) => {
          this.$emit("cancel-edge", sourceNode.data());
        },
      });
      this.cyInstance.edgehandles(config);

      this.cyInstance.manualLayoutForBuilder = () => {
        this.cyInstance
          .layout({
            name: "dagre",
            rankDir: "LR",
            fit: false,
            ranker: "longest-path",
            directed: true,
            nodeSep: 50,
            spacingFactor: 1.2,
            padding: 220,
          })
          .run();
        this.cyInstance.center();
      };
    },
    adjustNodeName(name) {
      return this.shouldBeTruncate(name)
        ? name.slice(0, this.maxNameLength) + "..."
        : name;
    },
    shouldBeTruncate(name) {
      if (name == null) {
        return false;
      }
      return name
        .split(" ")
        .some((element) => element.length > this.maxNameLength);
    },
  },
  created() {
    // Load plugins (only once)
    if (typeof cytoscape("core", "dagre") !== "function") {
      cytoscape.use(dagre);
    }
    if (typeof cytoscape("core", "edgehandles") !== "function") {
      cytoscape.use(edgehandles);
    }
  },
  async mounted() {
    this.renderGraph();

    await this.$nextTick();

    this.cyInstance.on("tapend", (event) => {
      this.tapEndPosition = event.position;
    });
  },
};
</script>

<style lang="scss">
.app-graph--outter-label {
  margin-top: 4px;
  max-width: 110px;
  text-align: center;
  font-size: 12px;
  color: black;
}

.__________cytoscape_container {
  overflow: hidden;
}

.a.__________cytoscape_container {
  max-width: 100% !important;
  width: 100% !important;
}
</style>
