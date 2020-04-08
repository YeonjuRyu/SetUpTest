// const path = require('path');

// const APP_DIR = path.resolve(__dirname, '../src');

// module.exports = ({ config, mode }) => {
//   config.module.rules.push({
//     entry: {
//       main: APP_DIR,
//     },
//     test: /\.(ts|tsx)$/,
//     use: [
//       {
//         loader: require.resolve('babel-loader'),
//         options: {
//           presets: [['react-native', { flow: false, typescript: true }]],
//         },
//       },
//       require.resolve('react-docgen-typescript-loader'),
//     ],
//   });
//   config.resolve.extensions.push('.ts', '.tsx');
//   return config;
// };
