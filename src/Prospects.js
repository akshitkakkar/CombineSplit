import { Checkbox, Box } from '@material-ui/core'
import React, {Fragment, useEffect} from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

const Prospects = ({prospect, handleChange, drag}) => {

    const [{isDragging, options}, dragRef, preview] = useDrag({
        type: "LEFT",
        item: {
            id: prospect.prospectId,
            firstName: prospect.firstName,
            lastName: prospect.lastName
        },
        options: {
            dropEffect: "move"
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging()
        })
      })

    //   useEffect(() => {
    //     preview(getEmptyImage(), { captureDraggingState: true });
    // }, []);

    return (
                <div ref={dragRef} className={prospect.class ? `${prospect.class} prospect-info` : "prospect-info"} id={prospect.prospectId}>
                  {!prospect.checkbox ?
                    <input onChange={handleChange} type="checkbox" checked={prospect.checked}/> :
                    ''
                    }
                  <span>{prospect.firstName} </span>
                  <span>{prospect.lastName}</span>
                </div>
        )
} 

export default Prospects