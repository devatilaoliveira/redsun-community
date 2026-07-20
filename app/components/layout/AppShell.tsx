import type { ReactNode } from "react";
import { RsTopBarNavigator } from "./RsTopBarNavigator";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-black text-zinc-100">
      <a
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-amber-400 px-4 py-2 font-semibold text-zinc-950 transition focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <RsTopBarNavigator />
      <div className="flex flex-1 flex-col" id="main-content" tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
