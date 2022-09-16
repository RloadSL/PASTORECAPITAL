import news from '../../assets/img/icons/academy.svg'
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
    href: '/noticias'
  },
  {
    label: 'mainMenu.item.label.academy',
    type: 'accordion',
    icon: academy,
    children: [
      {
        type: 'link',
        icon: academy,
        label: 'mainMenu.item.label.courses',
        children: null,
        href: 'https://google.com'
      },
      {
        type: 'link',
        icon: academy,
        label: 'mainMenu.item.label.tutorials',
        children: null,
        href: '/academy/courses/'
      }
    ]
  },
  {
    type: 'link',
    icon: news,
    label: 'mainMenu.item.label.analysis',
    children: null,
    href: '/noticias'
  },
  {
    type: 'link',
    icon: news,
    label: 'mainMenu.item.label.consultant',
    children: null,
    href: '/noticias'
  },
]