declare module 'koa-static' {
  import { Context } from 'koa'

  export default function serve(path: string): (ctx: Context, next: Function) => any
}
