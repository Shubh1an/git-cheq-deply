import {FC, useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '../core'
import {DrawerComponent} from '../../assets/ts/components'
import {WithChildren} from '../../helpers'

const Content: FC<WithChildren> = ({children}) => {
  const {classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])
//clsx(classes.contentContainer.join(' '))
  return (
    <div id='kt_content_container' style={{width : "96%", marginLeft : "30px"}} className={" px-auto"}>
      {children}
    </div>
  )
}

export {Content}
