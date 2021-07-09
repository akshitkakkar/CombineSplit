import './App.css';
import XarrowsExample from './XarrowsExample';
import LineToExample from './LineTo';
import SteppedLineToComponent from './SteppedLineToComponent';
import TreeExample from './TreeExample';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Xarrow from 'react-xarrows/lib';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

const buttonStyle = {
  position: "relative",
  left: "50%",
  right: "50%",
  top: "10px",
  fontWeight: "bold",
  border: "1px solid",
  height: "50px",
  width: "100px",
  background: "#f5f3b36b",
  margin: "10px"
}

const prospectInfo = [
  {firstName: 'Leanne',
   lastName: 'Graham',
   prospectId: "1",
   checked: false},
   {firstName: 'Ervin',
   lastName: 'Howell',
   prospectId: "2",
   checked: false},
   {firstName: 'Clementine',
   lastName: 'Bauch',
   prospectId: "3",
   checked: false},
   {firstName: 'Patricia',
   lastName: 'Lebsack',
   prospectId: "4",
   checked: false},
   {firstName: 'Chelsey',
   lastName: 'Dietrich',
   prospectId: "5",
   checked: false},
   {firstName: 'Glenna',
   lastName: 'Reichert',
   prospectId: "6",
   checked: false}
]
function App() {

  const [prospects, setProspects] = useState(prospectInfo)
  const [connections, setConnections] = useState([])



  const handleChange = (event) => {
    let index = prospects.findIndex(prospect => prospect.prospectId == event.target.parentNode.id)

    setProspects([...prospects.slice(0,index),
    Object.assign({}, prospects[index], {checked: !prospects[index].checked}),
      ...prospects.slice(index+1)])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const combine = () => {
    let combinedProspects = prospects.filter((prospect) => {
      return (prospect.checked) 
    })

    let combinedId = ''
    let combinedName = ''

    combinedProspects.map((prospect) => {
      combinedId = combinedId + prospect.prospectId + '_'
      combinedName = combinedName + prospect.firstName + ' & '
    })
    combinedId = combinedId.replace(/.$/,'')
    combinedName = combinedName.replace(/..$/,'')

    let div = document.createElement("div")
    let span = document.createElement("span")
    span.innerText = combinedName

    div.setAttribute("class", "dynamic-element prospect-info")
    div.setAttribute("id",combinedId)
    div.append(span)
    document.querySelector("#proposal-work-area__taxable-prospects-combined").append(div)

    let updatedState = []
    prospects.map(prospect => {
      updatedState.push(Object.assign({}, prospect, {checked: false}))
    })
    setProspects(updatedState)

    let connectedDivs = combinedId.split('_')
    let updateConnections = []
    connectedDivs.forEach(div => {
      updateConnections.push({start: div, end: combinedId})
    })
    setConnections([...connections, ...updateConnections])

  }

  const split = () => {
    let combinedProspects = prospects.filter((prospect) => {
      return (prospect.checked) 
    })
    
    combinedProspects.map(prospect => {
      let index = prospects.indexOf(prospect)
      setProspects([
        ...prospects.slice(0,index+1),
        {
          firstName: prospects[index].firstName,
          lastName: 'Remaining',
          prospectId: prospects[index].prospectId + '.1',
          checked: false,
          class: "dynamic-element"
        },
        ...prospects.slice(index+1)
      ])
    })

  }

  const reshuffle = () => {
    let combinedProspects = prospects.filter((prospect) => {
      return (prospect.checked) 
    })

    let reshuffledProspects = []

    combinedProspects.map(prospect => {
      let index = prospects.indexOf(prospect)
      reshuffledProspects.push(Object.assign({},prospects[index],{checked: false, class: "dynamic-element", checkbox: 'hide'}))
    })

    let filteredProspects = prospects.filter(prospect => {
      return reshuffledProspects.every(reshuffled => {
        return reshuffled.prospectId !== prospect.prospectId
      })
    })

    setProspects([
      ...reshuffledProspects,
      ...filteredProspects
    ])

  }

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route path="/treeExample" component={TreeExample}></Route>
        <Link to="/treeExample"><button style={buttonStyle}>Tree Example</button></Link>
      </BrowserRouter> */}
      <XarrowsExample/>
      {/* <LineToExample/>
      <SteppedLineToComponent/> */}
      <div id="proposal-work-area">
        <div id="proposal-work-area__taxable-prospects">
            {prospects.map((prospect) => {
              return (
                <div className={prospect.class ? `${prospect.class} prospect-info` : "prospect-info"} id={prospect.prospectId}>
                  {!prospect.checkbox ?
                    <input onChange={handleChange} type="checkbox" checked={prospect.checked}/> :
                    ''
                    }
                  <span>{prospect.firstName} </span>
                  <span>{prospect.lastName}</span>
                </div>
              )
            })}
        </div>
        <div onDragOver={(e) => handleDragOver} id="proposal-work-area__taxable-prospects-combined">
        </div>
        <div className="proposal-work-area__buttons">
          <button onClick={combine} button style={buttonStyle}>Combine</button>
          <button onClick={split} button style={buttonStyle}>Split</button>
          <button onClick={reshuffle} button style={buttonStyle}>Reshuffle</button>
      </div>
      {connections.map(connection => {
        return (
          <Xarrow curveness={false} path={"grid"} 
          showHead={false} 
          animateDrawing={2}
          start={connection.start} 
          end={connection.end}/>
        )
      })}
      </div>
    </div>
  );
}

export default App;
