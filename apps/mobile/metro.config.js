const path = require("path");
const { getDefaultConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

// Let Metro follow pnpm's symlinks.
config.resolver.disableHierarchicalLookup = false;

module.exports = withNativeWind(config, {
  input: "./global.css",
});