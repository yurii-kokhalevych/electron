module.exports = {
  packagerConfig: {
    asar: true,
    ignore: [
      "^/.idea",
      "^/.github",
      "^/.gitignore",
      "^/public",
      "^/src",
      "^/yarn.lock",
    ],
    icon: "icon",
  },
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "tree-app",
      },
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "tree-app",
      },
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        name: "tree-app",
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {
        name: "tree-app",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        name: "tree-app",
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        name: "tree-app",
      },
    },
  ]
};
