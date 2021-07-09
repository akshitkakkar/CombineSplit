import ReactDOM from "react-dom";
import React, { Component } from "react";
import TreeRenderer from "./TreeRenderer";
import { SteppedLine, Line } from "react-lineto";

Line.prototype.componentDidMount = function() {
  const { within = "" } = this.props;

  this.within = within ? this.findElement(within) : document.body;
  this.within.appendChild(this.el);
};

Line.prototype.componentWillUnmount = function() {
  const { within = "" } = this.props;

  this.within = within ? this.findElement(within) : document.body;
  this.within.removeChild(this.el);
};

class TreeExample extends Component {
  state = {
    directionIndex: 0,
    tree: [
      {
        name: "John Smith",
        children: [
          {
            name: "Alana Dauger",
            children: [
              {
                name: "Mathew Kurian",
                children: []
              }
            ]
          },
          {
            name: "Xinchen Huang",
            children: [
              {
                name: "Juliana Lo",
                children: []
              },
              {
                name: "John Doe",
                children: []
              }
            ]
          }
        ]
      }
    ]
  };
  render() {
    const { tree, directionIndex } = this.state;

    const cardWidth = 140;
    const cardHeight = 50;
    const gapWidth = 15;

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <button
          className="pure-button"
          style={{ position: "absolute", left: 10, top: 10, zIndex: 10 }}
          onClick={() => this.setState({ directionIndex: directionIndex + 1 })}
        >
          Switch Direction
        </button>
        <div className="org-chart" style={{ position: "relative" }}>
          <TreeRenderer
            nodes={tree}
            direction={["top", "left"][directionIndex % 2]}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gapWidth={gapWidth}
            keyGetter={(node, { level }, i) => node.name + i}
            renderNode={(
              node,
              { x, y, count, width, height, viewport, debug, parent, getNodeProps },
              styles
            ) => {
              const parentProps = parent ? getNodeProps(parent) : null;

              return (
                <div>
                  {/* <div
                  style={{
                    background: "rgba(255,0,0,0.2)",
                    border: "1px solid green",
                    position: "absolute",
                    left: viewport.x,
                    top: viewport.y,
                    height: viewport.height,
                    width: viewport.width
                  }}
                /> */}
                  {parentProps && (
                    <SteppedLine
                      zIndex={1}
                      className="animate"
                      within="org-chart"
                      borderColor="#CCC"
                      borderWidth={2}
                      x0={parentProps.x + cardWidth / 2}
                      y0={parentProps.y + cardHeight / 2}
                      x1={x + cardWidth / 2}
                      y1={y + cardHeight / 2}
                    />
                  )}
                  <div
                    onClick={() => {
                      console.log(node);
                      if (node.children.length) {
                        node.children.push(
                          JSON.parse(JSON.stringify(node.children[0]))
                        );
                      } else {
                        node.children.push(JSON.parse(JSON.stringify(node)));
                      }

                      this.forceUpdate();
                    }}
                    style={{
                      ...styles,
                      padding: 5,
                      zIndex: 2,
                      fontSize: 11,
                      boxSizing: "border-box",
                      borderRadius: 5,
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 20px rgba(0,0,0,0.2)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                      }}
                    >
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: "100%",
                          backgroundImage: `url(https://randomuser.me/api/portraits/men/${count +
                            5}.jpg)`,
                          backgroundSize: "cover",
                          marginRight: 10
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            whiteSpace: "nowrap",
                            fontWeight: "bold",
                            maxWidth: 75,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {node.name}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            opacity: 0.5,
                            whiteSpace: "nowrap",
                            fontWeight: "bold",
                            maxWidth: 75,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {
                            [
                              "CEO",
                              "COO",
                              "Performance Engineer",
                              "Software Engineer",
                              "Speed Tester"
                            ][count % 6]
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default TreeExample
