const Sequencer = require('@jest/test-sequencer').default
const fs = require('fs')
const path = require('path')

const basePath = path.join(__dirname, '../../src/modules/')

function getSortedModuleNames(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort()
}

function extractModuleName(testPath) {
  const match = testPath.match(/src\/modules\/(.*?)\//)
  return match ? match[1] : ''
}

const testOrder = getSortedModuleNames(basePath)

class CustomSequencer extends Sequencer {
  sort(tests) {
    return tests.sort((testA, testB) => {
      const indexA = testOrder.indexOf(extractModuleName(testA.path))
      const indexB = testOrder.indexOf(extractModuleName(testB.path))
      return indexA - indexB
    })
  }
}

module.exports = CustomSequencer
