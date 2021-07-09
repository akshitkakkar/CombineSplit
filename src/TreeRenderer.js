import React, { Component } from "react";

const NODE_PROPS_SYMBOL = Symbol;

export default class TreeRenderer extends Component {
  computeLayout(nodes) {
    const nodeProps = new WeakMap();

    const setNodeProps = (node, props) => {
      if (!nodeProps.has(node)) {
        nodeProps.set(node, {});
      }

      return Object.assign(nodeProps.get(node), props);
    };

    const getNodeProps = node => {
      if (!nodeProps.has(node)) {
        return {};
      }

      return nodeProps.get(node);
    };

    const stack = [nodes[0]];
    const levels = [];

    levels[0] = [nodes[0]];

    const computeWeight = node => {
      let weight = 0;

      if (node.children.length === 0) {
        weight = 1;
      } else {
        for (const child of node.children) {
          weight += computeWeight(child);
        }
      }

      setNodeProps(node, { weight });

      return weight;
    };

    computeWeight(nodes[0]);

    let count = 0;

    setNodeProps(nodes[0], { level: 0, count: count++, getNodeProps });

    while (stack.length) {
      const parent = stack.shift();
      const { children } = parent;
      const { level } = getNodeProps(parent);

      for (const node of children) {
        const props = setNodeProps(node, {
          count: count++,
          level: level + 1,
          parent,
          getNodeProps
        });

        levels[props.level] = levels[props.level] || [];
        levels[props.level].push(node);

        // node[NODE_PROPS_SYMBOL] = props;

        stack.push(node);
      }
    }

    // nodes[0][NODE_PROPS_SYMBOL] = getNodeProps(nodes[0]);

    console.log(levels);

    let { cardHeight, cardWidth, gapWidth, direction } = this.props;

    if (direction !== "top") {
      const cardWidthCpy = cardWidth;

      cardWidth = cardHeight;
      cardHeight = cardWidthCpy;
    }

    const maxWeight = getNodeProps(levels[0][0]).weight;
    const canvasWidth = maxWeight * (cardWidth + gapWidth);

    let computedHeight = gapWidth;

    const computePositions = (node, viewport) => {
      setNodeProps(node, {
        viewport,
        x: viewport.x + (viewport.width - cardWidth) / 2,
        y: viewport.y
      });

      let x = viewport.x;

      if (direction === "top") {
        computedHeight = Math.max(computedHeight, viewport.y + cardHeight);
      }

      const childrenWeight = node.children.reduce(
        (sum, node) => getNodeProps(node).weight + sum,
        0
      );

      node.children.forEach(node => {
        const width =
          (getNodeProps(node).weight / childrenWeight) * viewport.width;

        // console.log(getNodeProps(node).weight);

        setNodeProps(node, { debug: width + " " + getNodeProps(node).level });

        computePositions(node, {
          ...viewport,
          y: viewport.y + cardHeight + gapWidth,
          x,
          width
        });

        x += width;
      });
    };

    computePositions(levels[0][0], {
      x: 0,
      y: gapWidth,
      width: canvasWidth,
      height: 600
    });

    return { computedHeight, getNodeProps, computedWidth: canvasWidth };
  }

  renderNodes(nodes, getNodeProps, direction = "top") {
    const { renderNode, keyGetter, cardHeight, cardWidth } = this.props;

    return nodes.map((node, i) => {
      const nodeProps = getNodeProps(node);

      const renderedNode = renderNode(node, nodeProps, {
        height: cardHeight,
        width: cardWidth,
        position: "absolute",
        left: 0,
        right: 0,
        transform:
          direction === "top"
            ? `translate3d(${nodeProps.x}px, ${nodeProps.y}px, 0)`
            : `translate3d(${nodeProps.y}px, ${nodeProps.x}px, 0)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform 500ms ease-in-out"
      });

      return (
        <div key={keyGetter(node, nodeProps, i)}>
          {renderedNode}
          {this.renderNodes(node.children, getNodeProps, direction)}
        </div>
      );
    });
  }

  render() {
    const { nodes, direction } = this.props;
    const { getNodeProps, computedHeight, computedWidth } = this.computeLayout(
      nodes
    );

    return (
      <div>
        <div
          style={{
            position: "relative",
            height: direction === "top" ? computedHeight : "auto",
            width: direction === "top" ? computedWidth : computedHeight
          }}
        >
          {this.renderNodes(nodes, getNodeProps, direction)}
        </div>
      </div>
    );
  }
}
