import {Droppable} from 'react-beautiful-dnd'
import ListItem from './ListItem'
import React from 'react'
import styled from 'styled-components'

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #f4f5f7;
`

const DraggableElement = ({prefix, elements, index}: any) => {
  console.log('from dragList', prefix)
  return (
    <>
      <DroppableStyles>
        <Droppable droppableId={prefix.prefix}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((item: any, index: any) => (
                <ListItem
                  key={JSON.parse(JSON.stringify(item._id))}
                  item={item}
                  prefix={prefix.prefix}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DroppableStyles>
    </>
  )
}

export default DraggableElement
