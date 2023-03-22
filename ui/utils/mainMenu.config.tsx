import news from '../../assets/img/icons/news.svg'
import analysis from '../../assets/img/icons/analysis.svg'
import academy from '../../assets/img/icons/academy.svg'
import consultant from '../../assets/img/icons/consultant.svg'
import admin from '../../assets/img/icons/gear.svg'
import home from '../../assets/img/icons/home.svg'


import webinars from '../../assets/img/icons/webinars.svg'
import amas from '../../assets/img/icons/amas.svg'
import discord from '../../assets/img/icons/discord.svg'
import afiliates from '../../assets/img/icons/afiliates.svg'

export const mainMenuItems = [
  {
    type: 'link',
    icon: home,
    label: 'mainMenu.item.label.home',
    children: null,
    href: '/',
    path: '/home'
  },
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
    type: 'link',
    path: 'academy',
    href:'/academy',
    icon: academy,
    /* children: [
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
    ] */
  },
  {
    type: 'link',
    icon: analysis,
    label: 'mainMenu.item.label.research',
    href: '/research',
    path: null,
    // children: [
    //   {
    //     type: 'link',
    //     label: 'mainMenu.item.label.analysis',
    //     children: null,
    //     href: '/research/bitcoins-altcoins',
    //     path: 'research/bitcoins-altcoins'
    //   },
    //   {
    //     type: 'link',
    //     label: 'mainMenu.item.label.flashUpdates',
    //     children: null,
    //     href: '/research/flash-updates',
    //     path: 'research/flash-updates'
    //   }
    // ]
  },
  {
    type: 'link',
    icon: consultant,
    label: 'mainMenu.item.label.taxConsultant',
    href: '/tax-consultant',
    path: null,
    // children: [
    //   {
    //     type: 'link',
    //     label: 'mainMenu.item.label.consultants',
    //     children: null,
    //     href: '/tax-consultant/consultants',
    //     path:'tax-consultant/consultants'
    //   },
    //   {
    //     type: 'link',
    //     label: 'mainMenu.item.label.resources',
    //     children: null,
    //     href: '/tax-consultant/resources',
    //     path:'tax-consultant/resources'
    //   }
    // ]
  },
  {
    type: 'link',
    icon: discord,
    label: 'mainMenu.item.label.discord',
    children: null,
    href: '/discord',
    path:'discord'
  },
  {
    type: 'link',
    icon: webinars,
    label: 'mainMenu.item.label.webinars',
    children: null,
    href: '/webinars',
    path:'webinars'
  },
  {
    type: 'link',
    icon: amas,
    label: 'mainMenu.item.label.amas',
    children: null,
    href: '/amas',
    path:'amas'
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
        label: 'mainMenu.item.label.visibility',
        children: null,
        href: '/administration/accessibility',
        path:'administration/accessibility'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.users',
        children: null,
        href: '/administration/users',
        path:'administration/users'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.stats',
        children: null,
        href: '/administration/stats',
        path:'administration'
      },
      {
        type: 'link',
        label: 'mainMenu.item.label.invoice',
        children: null,
        href: '/administration/invoices',
        path:'administration/invoices'
      }
    ]
  },
]