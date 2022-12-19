const presets = ['module:metro-react-native-babel-preset']
const plugins = []
const env = {
  production: {
    plugins: ['transform-remove-console'],
  },
  // development: {
  //   plugins: ['transform-remove-console'],
  // },
}
plugins.push(
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        '@': './src',
      },
    },
  ],
  'react-native-reanimated/plugin',
)

module.exports = {
  presets,
  plugins,
  env,
}
