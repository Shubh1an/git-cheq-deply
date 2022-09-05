import {Draggable} from 'react-beautiful-dnd'

import React, {useMemo} from 'react'
import styled, {css} from 'styled-components'
import {KTSVG} from '../../../_metronic/helpers'
interface Props {
  open: string
}

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`

const CardHeader = styled.div`
  font-weight: 500;
`

const DragItem = styled.div<Props>`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #fff;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`

const ListItem = ({item, index, prefix}: any) => {
  let newId = JSON.parse(JSON.stringify(item._id))
  return (
    <Draggable draggableId={newId} index={index}>
      {(provided, snapshot: any) => {
        return (
          <DragItem
            open={prefix}
            ref={provided.innerRef}
            draggable
            // snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='d-flex w-100 align-items-center justify-content-between'>
              <div className='font-weight-normal'>
                Module Name{' '}
                <p className='badge badge-light-primary fs-bold ms-2'>
                  {item.moduleName.toUpperCase()}
                </p>
              </div>

              <div className='d-flex align-items-center justify-content-center'>
                {prefix === 'inActiveRewardList' ? (
                  <span className='badge badge-danger me-3'>InActive</span>
                ) : (
                  <span className='badge badge-primary me-3'>Active</span>
                )}
                <CardHeader>{`Priority - ${
                  prefix === 'inActiveRewardList' ? 'N/A' : item.priority
                }`}</CardHeader>
              </div>
            </div>

            <span>Content</span>
            {/* <CardFooter>
              <span>{item.content}</span>
              <Author>
                {item.id}
                <Avatar src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`} />
              </Author>
            </CardFooter> */}
          </DragItem>
        )
      }}
    </Draggable>
  )
}

export default ListItem
