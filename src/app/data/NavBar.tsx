import { ReactElement } from 'react'
import CopyrightLineIcon from 'remixicon-react/CopyrightLineIcon'
import Home5LineIcon from 'remixicon-react/Home5LineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import HistoryLineIcon from 'remixicon-react/HistoryLineIcon'
import BriefcaseLineIcon from 'remixicon-react/BriefcaseLineIcon'
import UserStarLineIcon from 'remixicon-react/UserStarLineIcon'
import AwardLineIcon from 'remixicon-react/AwardLineIcon'
import ProjectorLineIcon from 'remixicon-react/ProjectorLineIcon'
import PriceTag3LineIcon from 'remixicon-react/PriceTag3LineIcon'
import ContactsBook2LineIcon from 'remixicon-react/ContactsBook2LineIcon'
import QuestionAnswerLineIcon from 'remixicon-react/QuestionAnswerLineIcon'
import MoonFoggyFillIcon from 'remixicon-react/MoonFoggyFillIcon'
import SunFoggyFillIcon from 'remixicon-react/SunFoggyFillIcon'

export interface NavItem {
    id: string
    name: string
    icon: ReactElement
}

export const navbarData: NavItem[] = [
    { id: 'home', name: 'Home', icon: <Home5LineIcon /> },
    { id: 'about', name: 'About', icon: <UserLineIcon /> },
    { id: 'experience', name: 'MyRoad', icon: <HistoryLineIcon /> },
    { id: 'skills', name: 'Skills', icon: <BriefcaseLineIcon /> },
    { id: 'reviews', name: 'Reviews', icon: <UserStarLineIcon /> },
    { id: 'certifications', name: 'Certifications', icon: <AwardLineIcon /> },
    { id: 'projects', name: 'Projects', icon: <ProjectorLineIcon /> },
    { id: 'pricing', name: 'Pricing', icon: <PriceTag3LineIcon /> },
    { id: 'contact', name: 'Contact', icon: <ContactsBook2LineIcon /> },
    { id: 'questions', name: 'Questions', icon: <QuestionAnswerLineIcon /> },
]

export const copyRightIcon: ReactElement = <CopyrightLineIcon />
export const sunIcon: ReactElement = <SunFoggyFillIcon />
export const moonIcon: ReactElement = <MoonFoggyFillIcon />