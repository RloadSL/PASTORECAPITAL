/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import style from './colaboration.module.scss'
import ButtonApp from 'components/ButtonApp';
import { collaborationPermissions } from 'domain/Constants/collaboration_permissions';
import { FormattedMessage } from 'react-intl';
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository';
import { useRouter } from 'next/router';


const Colaboration = () => {
  const {query} = useRouter()
  const [text, setText] = useState("")
  const [state, setState] = useState<any>({
    "disabled": {
      title: "Deshabilitado",
      items: []
    },
    
    "enabled": {
      title: "Habilitado",
      items: []
    }
  })

  useEffect(() => {
    let fetching = true
    if(query.uid){
      UserRepositoryImplInstance.read(query.uid as string).then(user => {
        const enabled:any[] = []
        const disabled:any[] = []
  
        collaborationPermissions.forEach(items => {
          if(user?.collaboration && user?.collaboration[items.id ]){
            enabled.push(items)
          }else{
            disabled.push(items)
          }
  
          setState({
            "disabled": {
              title: "Deshabilitado",
              items: disabled
            },
            
            "enabled": {
              title: "Habilitado",
              items: enabled
            }
          })
        })
      })
    }
    return () => {
      fetching = false
    }
  }, [])
  

  const handleDragEnd = ({destination, source}:any) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState((prev:any) => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const _onSave = async () => {
    const {items} = state.enabled
    const collaboration:any = {};
    items.forEach( (item:any) => {
      collaboration[item.id] = true;
    });
    try {
      await UserRepositoryImplInstance.update(query.uid as string, {collaboration})

    } catch (error) {
      console.log(error)
    }
    
   } 

  return (
    <div className={style.collaboration}>
      <div className={'header'}>
        <h1 className='main-title'>Gestión de permisos de Colaboradores</h1>
      </div>
      <div className='body'>
      <div className={style.App}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={style.column}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={style['droppable-col']}
                    >
                      {data.items.map((el:any, index:number) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              return(
                                <div
                                  className={`${style.item} ${snapshot.isDragging ? style.dragging : ''}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <h3>
                                    <FormattedMessage id={`${el.id}`}/>  
                                  </h3> 
                                  <p>
                                    <FormattedMessage id={`${el.description}`}/>
                                  </p>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
    <div className={style.btnContainer}>
      <div style={{width:200}}>
      <ButtonApp buttonStyle={'primary'} onClick={_onSave} labelID={'btn.save'}/>
      </div>
      
    </div>
        
      </div>
    </div>
  )
}



export default Colaboration