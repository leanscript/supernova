export function SupernovaResolver(prefix: string, dirPath: string = 'views', entrypoint: string = 'main.js') {
  return {
    name: 'supernova-resolver',
    transform(code: string, id: string) {
      if(id.match(entrypoint))
      {
        const regex = /registerSupernovaRoutes\((\w*)\)/
        const matchedRouteRegistrar = code.match(regex)
        const dummyFunction = matchedRouteRegistrar[0]
        const routerVar = matchedRouteRegistrar[1]

        const match = code.replace(
           dummyFunction, // dummy function, replaced at build time
           `registerAdminRoutes(${routerVar}, '${prefix}', import.meta.glob('@/${dirPath}/**/*.vue'), '${dirPath}')`
        )
        return match
      }
      return code
    },
  }
}
