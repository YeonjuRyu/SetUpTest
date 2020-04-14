module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.stories.ts',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@constant': './src/common/Constant.ts',
          '@styles': './src/common/Styles.ts',
          '@common': './src/common',
          '@components': './src/components',
          '@routes': './src/routes',
          '@images': './src/assets/images',
          '@screens': './src/screens',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@util': './src/util',
          '@type': './src/type',
          '@api': './src/api',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console', 'transform-remove-debugger'],
    },
  },
};
