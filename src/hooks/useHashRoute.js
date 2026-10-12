import { useSyncExternalStore } from "react";

function subscribe(listener) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

function getSnapshot() {
  return window.location.hash;
}

export default function useHashRoute() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const match = hash.match(/^#\/(proyectos|demos)\/([^/]+)$/);

  return {
    hash,
    page: match?.[1] ?? (hash.startsWith("#/") ? "not-found" : "home"),
    slug: match?.[2] ?? null,
  };
}
