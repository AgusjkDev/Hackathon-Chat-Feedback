/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    webpack: config => {
        // -> https://github.com/websockets/ws/issues/1126 ...
        config.externals = [...config.externals, "bufferutil", "utf-8-validate", "supports-color"];

        return config;
    },
};

module.exports = nextConfig;
