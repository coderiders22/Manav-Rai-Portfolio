// Lightweight cross-component triggers (nav, hero, command menu, chat widget).
export const OPEN_COMMAND_MENU = "portfolio:open-command-menu";
export const OPEN_QUICK_CONNECT = "portfolio:open-quick-connect";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
}

export function openQuickConnect() {
  window.dispatchEvent(new Event(OPEN_QUICK_CONNECT));
}
