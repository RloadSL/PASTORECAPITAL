import news from '../../assets/img/icons/news.svg'
import analysis from '../../assets/img/icons/analysis.svg'
import academy from '../../assets/img/icons/academy.svg'
import consultant from '../../assets/img/icons/consultant.svg'
import admin from '../../assets/img/icons/gear.svg'

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
    href: '/news',
    path: 'news'
  },
  {
    label: 'mainMenu.item.label.academy',
    type: 'accordion',
    path: 'academy',
    href:'/academy',
    icon: academy,
    children: [
      {
        type: 'link',
        label: 'mainMenu.item.label.courses',
        children: null,
        href: '/academy/courses',
        path:'courses'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.tutorials',
        children: null,
        href: '/academy/tutorials',
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
  {
    label: 'mainMenu.item.label.administation',
    type: 'accordion',
    isAdministrator: true,
    path: 'administration',
    href:'/administration',
    icon: admin,
    children: [
      {
        type: 'link',
        label: 'mainMenu.item.label.users',
        children: null,
        href: '/administration',
        path:'administration'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.stats',
        children: null,
        href: '/administration',
        path:'administration'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.invoice',
        children: null,
        href: 'administration',
        path:'administration'
      }
    ]
  },
]