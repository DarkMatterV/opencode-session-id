// @ts-nocheck
/** @jsxImportSource @opentui/solid */
import { Show } from "solid-js"

const tui = async (api) => {
  api.slots.register({
    order: 50,
    slots: {
      sidebar_content(_ctx, props) {
        const theme = api.theme.current
        return (
          <Show when={props.session_id}>
            <box flexDirection="column" gap={0}>
              <text fg={theme.text}>
                <b>Session</b>
              </text>
              <text fg={theme.textMuted}>{props.session_id}</text>
            </box>
          </Show>
        )
      },
    },
  })
}

const plugin = {
  id: "opencode.session-id",
  tui,
}

export default plugin
