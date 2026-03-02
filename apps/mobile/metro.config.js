// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

module.exports = (() => {
  const config = getDefaultConfig(projectRoot)

  const { transformer, resolver } = config

  // Watch all files in the monorepo
  config.watchFolders = [monorepoRoot]

  // Resolve modules from both the project and the monorepo root
  config.resolver = {
    ...resolver,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    alias: {
      '@': './src',
      '@dtos': './src/dtos',
      '@assets': './src/assets',
      '@components': './src/components',
      '@screens': './src/screens',
      '@storage': './src/storage',
      '@utils': './src/utils',
      '@services': './src/services',
      '@hooks': './src/hooks',
      '@contexts': './src/contexts',
      '@routes': './src/routes',
      '@config': './src/config',
      '@api': './src/api',
      '@lib': './src/lib',
    },
  }

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }

  return config
})()
