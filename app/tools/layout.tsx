import type { ReactNode } from 'react';
import ToolSeoSupport from '@/components/tools/ToolSeoSupport';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <>{children}<ToolSeoSupport /></>;
}
