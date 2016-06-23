declare module 'koa-static' {
  import { Context } from 'koa'

  function serve(path: string): (ctx: Context, next: Function) => any
  namespace serve {}

  export = serve
}

declare module 'react-hot-loader' {
  import { Component } from 'react'
  interface Props {}
  interface State {}
  export class AppContainer extends Component<Props, State> {}
}
