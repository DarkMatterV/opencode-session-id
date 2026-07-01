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
          <box
            backgroundColor={theme.backgroundElement}
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            flexDirection="column"
            gap={0}
          >
            <Show when={props.session_id}>
              <box flexDirection="column" gap={0}>
                <text fg={theme.text}>
                  <b>Session ID</b>
                </text>
                <text fg={theme.textMuted}>{props.session_id}</text>
              </box>
            </Show>
          </box>
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
