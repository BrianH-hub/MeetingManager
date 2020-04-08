import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import ProfileDescription from './ProfileDescription'
import ProfileFollowings from './ProfileFollowings'
import ProfileActivities from './ProfileActivities'

const panes = [
    {menuItem:'About',render:() => <ProfileDescription />},
    {menuItem:'Photos',render:() => <ProfilePhotos />},
    {menuItem:'Meetings',render:() => <ProfileActivities />},
    {menuItem:'Followers',render:() => <ProfileFollowings />},
    { menuItem: 'Following', render: () => <ProfileFollowings /> }
]

interface IProps{
    setActiveTab:(newIndex:any)=>void
}

const ProfileContent:React.FC<IProps> = ({setActiveTab}) => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            defaultActiveIndex={1}
            onTabChange={(e,data)=>setActiveTab(data.activeIndex)}
        />
    )
}

export default ProfileContent
