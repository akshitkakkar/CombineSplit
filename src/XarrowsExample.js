import React, {useRef} from "react";
import Xarrow from "react-xarrows";

const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
};

function XarrowsExample() {
    const box1Ref = useRef(null);
    var p = document.createElement("p")
    p.innerHTML = 'hey3'
    return (
        <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
            <div id="div1" style={boxStyle}>
                <p id="elem1" style={boxStyle}>
                    hey1
                </p>
                <p id="elem2" style={boxStyle}>
                    hey2
                </p>
                <p className="dynamic">
                {
                    setTimeout(() => {
                        document.querySelector(".dynamic").innerText = 'hey3'
                        document.querySelector(".dynamic").setAttribute("id", "elem3")
                    },3000)
                }
                </p>
            </div>
            <div style={boxStyle}>
                <p id="elem4" style={boxStyle}>
                    hey1
                </p>
                <p id="elem5" style={boxStyle}>
                    hey2
                </p>
                <p id="elem6" style={boxStyle}>
                    hey3
                </p>
            </div>
            
            <Xarrow
                start="elem1" //can be react ref
                end="elem5" //or an id
            />
            <Xarrow
                start="elem2" //can be react ref
                end="elem5" //or an id
            />
            <Xarrow
                start="elem1" //can be react ref
                end="elem4" //or an id
            />
        </div>
    );
}

export default XarrowsExample;