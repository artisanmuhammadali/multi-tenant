import canAccess from './canAccess'

export default function registerDirectives(app) {
  app.directive('canAccess', canAccess)
}
