export default function createController (controller) {

  return function (req, res, next) {
    return controller(req, res).catch(next)
  }

}
