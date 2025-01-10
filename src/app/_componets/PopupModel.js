import { Popover } from "@headlessui/react";

function PopupModel() {
  return (
    <Popover>
      <Popover.Button>Solutions</Popover.Button>
      <Popover.Panel>
        <a href="/insights">Insights</a>
        <a href="/automations">Automations</a>
        <a href="/reports">Reports</a>
      </Popover.Panel>
    </Popover>
  );
}
