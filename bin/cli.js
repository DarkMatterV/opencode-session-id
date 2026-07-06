#!/usr/bin/env node
import { existsSync, mkdirSync, symlinkSync, unlinkSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(__dirname, "..");
const sourceFile = join(packageDir, "src/OpencodeSessionID.tui.tsx");
const configDir = join(process.env.HOME, ".config", "opencode");
const pluginDir = join(configDir, "plugins");
const symlinkPath = join(pluginDir, "OpencodeSessionID.tui.tsx");
const tuiJsonPath = join(configDir, "tui.json");

const pluginEntry = symlinkPath;

const oldSymlinks = [
  join(pluginDir, "opencode-session-id"),
];

const oldPluginPaths = [
  "./plugin/opencode-session-id/dist/index.js",
];

function hasPluginEntry(config) {
  if (!Array.isArray(config.plugin)) return false;
  return config.plugin.some((p) => p === pluginEntry);
}

function isOldPluginEntry(p) {
  if (typeof p !== "string") return false;
  if (oldPluginPaths.includes(p)) return true;
  return oldSymlinks.some((old) => p === old);
}

async function cleanOldInstall(config) {
  for (const old of oldSymlinks) {
    if (existsSync(old)) {
      unlinkSync(old);
      console.log(`  Removed old symlink: ${old}`);
    }
  }
  if (Array.isArray(config.plugin)) {
    const before = config.plugin.length;
    config.plugin = config.plugin.filter((p) => !isOldPluginEntry(p));
    if (config.plugin.length !== before) {
      console.log("  Removed old plugin entries from tui.json");
    }
  }
}

async function install() {
  console.log("Installing opencode-session-id...");

  let config = { $schema: "https://opencode.ai/tui.json" };
  if (existsSync(tuiJsonPath)) {
    config = JSON.parse(await readFile(tuiJsonPath, "utf-8"));
  }

  await cleanOldInstall(config);

  if (!existsSync(pluginDir)) {
    mkdirSync(pluginDir, { recursive: true });
  }

  if (!existsSync(symlinkPath)) {
    symlinkSync(sourceFile, symlinkPath, "file");
    console.log(`  Created symlink: ${symlinkPath} -> ${sourceFile}`);
  } else {
    console.log("  Symlink already exists, skipping.");
  }

  if (!Array.isArray(config.plugin)) {
    config.plugin = [];
  }

  if (!hasPluginEntry(config)) {
    config.plugin.push(pluginEntry);
    console.log("  Added plugin entry to tui.json");
  } else {
    console.log("  Plugin entry already in tui.json, skipping.");
  }

  await writeFile(tuiJsonPath, JSON.stringify(config, null, 2) + "\n");
  console.log("  Updated tui.json");
  console.log("Installation complete!");
}

async function uninstall() {
  console.log("Uninstalling opencode-session-id...");

  if (existsSync(tuiJsonPath)) {
    const config = JSON.parse(await readFile(tuiJsonPath, "utf-8"));

    if (Array.isArray(config.plugin)) {
      const before = config.plugin.length;
      config.plugin = config.plugin.filter(
        (p) => p !== pluginEntry
      );
      if (config.plugin.length !== before) {
        console.log("  Removed plugin entries from tui.json");
      }
      if (config.plugin.length === 0) {
        delete config.plugin;
      }
    }

    await writeFile(tuiJsonPath, JSON.stringify(config, null, 2) + "\n");
    console.log("  Updated tui.json");
  }

  if (existsSync(symlinkPath)) {
    unlinkSync(symlinkPath);
    console.log(`  Removed symlink: ${symlinkPath}`);
  }

  for (const old of oldSymlinks) {
    if (existsSync(old)) {
      unlinkSync(old);
      console.log(`  Removed old symlink: ${old}`);
    }
  }

  console.log("Uninstallation complete!");
}

const command = process.argv[2];
if (command === "install") {
  await install();
} else if (command === "uninstall") {
  await uninstall();
} else {
  console.log("Usage: opencode-session-id <install|uninstall>");
  process.exit(1);
}
