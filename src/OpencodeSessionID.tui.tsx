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
      app_bottom() {
        const theme = api.theme.current
        const route = api.route.current
        if (route.name !== "session") return null
        const sid = route.params?.sessionID
        if (!sid) return null
        const session = api.state.session.get(sid)
        if (!session?.parentID) return null
        return (
          <Show when={sid}>
            <box flexDirection="row" gap={1} p={1} paddingLeft={4} paddingBottom={1}>
              <text fg={theme.text}><b>Session</b></text>
              <text fg={theme.textMuted}>{sid}</text>
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
