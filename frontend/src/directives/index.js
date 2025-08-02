import canAccess from './canAccess'
import cleanHtml from './cleanHtml'

export default function registerDirectives(app) {
  app.directive('canAccess', canAccess)
  app.directive('cleanHtml', cleanHtml)
}
