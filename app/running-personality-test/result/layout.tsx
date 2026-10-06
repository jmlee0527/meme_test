import { ResultDiscovery } from "@/components/discovery/ResultDiscovery";

export default function RunningResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<ResultDiscovery currentTestSlug="running-personality-test" /></>;
}
