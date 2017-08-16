import Information from './pages/information'

const routes = {
  path: '/information',
  name: '信息管理',
  childRoutes: [
    { path: 'list', name: '信息列表', component: Information },
  ]
}

export default routes

export const menuSub = []

for (let e of routes.childRoutes) {
  menuSub.push({
    key: e.path,
    name: e.name,
    path: 'information'
  })
}