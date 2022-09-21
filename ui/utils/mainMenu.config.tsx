import news from '../../assets/img/icons/news.svg'
import analysis from '../../assets/img/icons/analysis.svg'
import academy from '../../assets/img/icons/academy.svg'
import consultant from '../../assets/img/icons/consultant.svg'
import webinars from '../../assets/img/icons/academy.svg'
import AMAs from '../../assets/img/icons/academy.svg'
import discord from '../../assets/img/icons/academy.svg'
import afiliates from '../../assets/img/icons/afiliates.svg'

export const mainMenuItems = [
  {
    type: 'link',
    icon: news,
    label: 'mainMenu.item.label.news',
    children: null,
    href: '/noticias',
    path: 'noticias'
  },
  {
    label: 'mainMenu.item.label.academy',
    type: 'accordion',
    path: 'academy',
    icon: academy,
    children: [
      {
        type: 'link',
        label: 'mainMenu.item.label.courses',
        children: null,
        href: '/academy/courses/',
        path:'courses'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.tutorials',
        children: null,
        href: '/academy/tutorials/',
        path:'tutorials'
      }
    ]
  },
  {
    type: 'link',
    icon: analysis,
    label: 'mainMenu.item.label.analysis',
    children: null,
    href: '/analysis',
    path:'analysis'
  },
  {
    type: 'link',
    icon: consultant,
    label: 'mainMenu.item.label.consultant',
    children: null,
    href: '/consultant',
    path:'consultant'
  },
]