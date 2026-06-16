import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  navigation?: ReactNode;
};

export function AppShell({ children, navigation }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="shrink-0">{navigation}</div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
