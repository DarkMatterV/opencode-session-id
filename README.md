# opencode-session-id-display

An [OpenCode](https://opencode.ai) TUI plugin that displays the current session ID in the sidebar.

This is useful when you need to copy, share, inspect, or reference the active OpenCode session while working inside the TUI.

## Installation

```bash
npx opencode-session-id-display install
```

The installer will:

1. Create a symlink at `~/.config/opencode/plugins/OpencodeSessionID.tui.tsx`
2. Add the plugin entry to `~/.config/opencode/tui.json`

Restart the OpenCode TUI after installation. The active session ID will appear in the right sidebar.

## Uninstall

```bash
npx opencode-session-id-display uninstall
```

This removes the symlink and cleans up the plugin entry in `tui.json`.

## How It Works

The plugin registers a `sidebar_content` slot in the OpenCode TUI and renders the current session ID from the active session context.

## Requirements

- OpenCode TUI
- Node.js with `npx`
- `@opentui/core` >= 0.3.4
- `@opentui/solid` >= 0.3.4

## Development

```bash
git clone https://github.com/DarkMatterV/opencode-session-id.git
cd opencode-session-id
npm install
```

The plugin source is in `src/OpencodeSessionID.tui.tsx`, and the installer CLI is in `bin/cli.js`.

## License

MIT

