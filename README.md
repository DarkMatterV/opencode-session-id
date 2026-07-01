# opencode-session-id-display

An [opencode](https://opencode.ai) TUI plugin that displays the current session ID in the sidebar.

## Installation

```bash
npx opencode-session-id-display install
```

This will:

1. Create a symlink at `~/.config/opencode/plugin/OpencodeSessionID.tui.tsx`
2. Add the plugin to `~/.config/opencode/tui.json`

Restart opencode TUI to see the session ID in the right sidebar.

## Uninstall

```bash
npx opencode-session-id-display uninstall
```

Removes the symlink and cleans up `tui.json`.

## How it works

The plugin registers a `sidebar_content` slot in the opencode TUI, displaying the active session's ID.

Built with [@opentui/solid](https://www.npmjs.com/package/@opentui/solid) JSX and the [opencode TUI plugin API](https://opencode.ai).
