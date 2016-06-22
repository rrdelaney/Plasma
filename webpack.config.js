module.exports = {
  entry: './src/client.tsx',
  output: {
    path: 'target/static',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  modulesDirectories: ['./src', 'node_modules'],
  devServer: {
    proxy: {
      '*': 'http://localhost:3051'
    }
  }
}
