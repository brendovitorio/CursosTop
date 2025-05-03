import { useState, createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabsContextType = {
  active: string;
  setActive: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({ defaultValue, className, children }: {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a Tabs provider");
  }
  return context;
}

export function TabsList({ children, className }: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex gap-2 border-b border-zinc-200", className)}>{children}</div>;
}

export function TabsTrigger({ value, children, className }: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { active, setActive } = useTabs();
  const isActive = active === value;
  
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        "px-4 py-2 text-sm font-semibold border-b-2",
        isActive ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-600 hover:text-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { active } = useTabs();
  return active === value ? <div className={cn("mt-4", className)}>{children}</div> : null;
}