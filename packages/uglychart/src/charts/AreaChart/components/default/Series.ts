import { Widget, Stack } from "@moonmoonbrothers/flutterjs";
export default function Series({ children }: { children: Widget[] }) {
  return Stack({
    children,
  });
}
