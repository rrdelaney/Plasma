import * as React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import * as Koa from 'koa'
import * as serve from 'koa-static'

import { routes } from './app'

const PORT: number = process.env.PORT || 3051
const app = new Koa()

function renderClientHTML (body) {
  return renderToStaticMarkup(<html>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: body }}></div>
      <script src='/app.js' />
    </body>
  </html>)
}

app.use(serve('/static'))

app.use((ctx, next) => {
  match({ routes, location: ctx.path }, (err, redirectLocation, renderProps) => {
    if (err) {
      ctx.status = 500
      ctx.body = err.message
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search, '/')
    } else if (renderProps) {
      ctx.status = 200
      ctx.body = renderClientHTML(renderToString(<RouterContext {...renderProps} />))
    } else {
      ctx.status = 404
      ctx.body = 'Not found'
    }

    next()
  })
})

app.listen(PORT)
