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
  webpack(config, { isServer }) {
    // Next.js 15.4.10 ships a vendored React (next/dist/compiled/react) that
    // does NOT export useEffectEvent, which sanity@5.20.0 requires.
    // Only patch the client bundle's react$ alias — leave server/edge/RSC
    // rules untouched so the react-server condition keeps working.
    if (isServer) return config;

    const path = require("path");
    const realReactDir = path.dirname(require.resolve("react/package.json"));
    const realReactDomDir = path.dirname(
      require.resolve("react-dom/package.json")
    );

    function isBrowserClientAlias(alias) {
      // Only patch aliases that point to the regular (non-react-server) compiled
      // react. Skip edge/server aliases (they contain "react-server" in target).
      if (!alias) return false;
      const reactTarget = alias["react$"];
      if (!reactTarget) return false;
      if (typeof reactTarget !== "string") return false;
      return (
        reactTarget.includes("compiled/react") &&
        !reactTarget.includes("react-server")
      );
    }

    function fixReactAliases(rules) {
      if (!Array.isArray(rules)) return;
      for (const rule of rules) {
        if (!rule || typeof rule !== "object") continue;
        if (rule.resolve && isBrowserClientAlias(rule.resolve.alias)) {
          const alias = rule.resolve.alias;
          alias["react$"] = path.join(realReactDir, "index.js");
          if (alias["react/jsx-runtime$"])
            alias["react/jsx-runtime$"] = path.join(
              realReactDir,
              "jsx-runtime.js"
            );
          if (alias["react/jsx-dev-runtime$"])
            alias["react/jsx-dev-runtime$"] = path.join(
              realReactDir,
              "jsx-dev-runtime.js"
            );
          if (alias["react-dom$"])
            alias["react-dom$"] = path.join(realReactDomDir, "index.js");
          if (alias["react-dom/client$"])
            alias["react-dom/client$"] = path.join(
              realReactDomDir,
              "client.js"
            );
        }
        if (rule.oneOf) fixReactAliases(rule.oneOf);
        if (rule.rules) fixReactAliases(rule.rules);
      }
    }

    fixReactAliases(config.module.rules);
    return config;
  },
};

export default withMDX(nextConfig);
