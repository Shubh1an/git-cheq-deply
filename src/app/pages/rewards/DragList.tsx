import React, {useEffect} from 'react'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'
import DraggableElement from './DraggableElement'
import {MobxStore} from '../../../mobx'
import Rewards from '../../../services/Rewards'
import {observer} from 'mobx-react'

const DragDropContextContainer = styled.div`
  padding: 20px;
  border-radius: 6px;
`
const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  margin-left: 5px;
`
const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  width: 100%;
`

let lists = [
  {prefix: 'activeRewardList', title: 'Active Rewards'},
  {prefix: 'inActiveRewardList', title: 'InActive Rewards'},
]

const DragList = () => {
  const {rewardStore} = MobxStore.getInstance()
  const {totalRewardList} = rewardStore
  console.log('from draglist', totalRewardList)
  const onDragEnd = (result: any) => {
    Rewards.onDrag(result)
    // const {destination, source} = result
    // console.log('SOURCE_INDEX - ', source.index)
    // console.log('DESTINATION_INDEX - ', destination.index)

    // function array_move(arr, old_index, new_index) {
    //   if (new_index >= arr.length) {
    //     var k = new_index - arr.length + 1
    //     while (k--) {
    //       arr.push(undefined)
    //     }
    //   }
    //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
    //   return arr // for testing
    // }
    // if (destination.droppableId == 'activeRewardList' && source.droppableId == 'activeRewardList') {
    //   listCopy.activeRewardList = array_move(
    //     listCopy.activeRewardList,
    //     source.index,
    //     destination.index
    //   )
    // }
  }

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <div className='col-md-6'>
          <ColumnHeader>{lists[0].title}</ColumnHeader>
          <ColumnHeader>{lists[1].title}</ColumnHeader>
        </div> */}
        <ListGrid>
          <ColumnHeader>{lists[0].title}</ColumnHeader>
          <ColumnHeader>{lists[1].title}</ColumnHeader>
          {lists.map((listKey: any, index) => (
            <DraggableElement
              elements={totalRewardList[listKey.prefix as keyof typeof totalRewardList]}
              key={listKey.prefix}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  )
}

export default observer(DragList)
