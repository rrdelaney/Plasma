import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import * as Koa from 'koa'

import { routes } from './app'

const PORT: number = process.env.PORT || 3050
const app = new Koa()

app.use((ctx, next) => {
  match({ routes, location: ctx.path }, (err, redirectLocation, renderProps) => {
    if (err) {
      ctx.status = 500
      ctx.body = err.message
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search, '/')
    } else if (renderProps) {
      ctx.status = 200
      ctx.body = renderToString(<RouterContext {...renderProps} />)
    } else {
      ctx.status = 404
      ctx.body = 'Not found'
    }

    next()
  })
})

app.listen(PORT)
