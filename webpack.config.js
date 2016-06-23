module.exports = {
  debug: true,
  entry: [
    './src/client.tsx'
  ],
  output: {
    path: 'target/static',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript',
        query: {
          module: 'es6',
          jsx: 'preserve',
          useBabel: true,
          babelOptions: {
            presets: ['es2015', 'react', 'react-hmre']
          }
        }
      }
    ]
  },
  devServer: {
    proxy: {
      '*': 'http://localhost:3051'
    }
  }
}
