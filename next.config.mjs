import mdx from "@next/mdx";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  webpack(config, { isServer }) {
    // Next.js 15.4.10 ships a vendored React (next/dist/compiled/react) that
    // does NOT export useEffectEvent, which sanity@5.20.0 requires.
    // Patch config.resolve.alias directly in the client bundle only —
    // leave the server bundle untouched so the react-server condition works.
    if (isServer) return config;

    const path = require("path");
    const realReactDir = path.dirname(require.resolve("react/package.json"));
    const realReactDomDir = path.dirname(
      require.resolve("react-dom/package.json")
    );

    // Alias to the package DIRECTORY (not a file) so webpack can resolve
    // both "react" and subpaths like "react/jsx-runtime" through the
    // package's own exports — avoiding the vendored Next.js compiled/react
    // which lacks useEffectEvent required by sanity@5.
    config.resolve.alias = {
      ...config.resolve.alias,
      "react": realReactDir,
      "react-dom": realReactDomDir,
    };

    return config;
  },
};

export default withMDX(nextConfig);
