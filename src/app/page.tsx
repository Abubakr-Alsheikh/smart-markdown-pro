import { EditorLayout } from "@/components/editor/editor-layout";

export default function HomePage() {
  // This remains a Server Component, delegating the interactive UI
  // to the client component below.
  return <EditorLayout />;
}
