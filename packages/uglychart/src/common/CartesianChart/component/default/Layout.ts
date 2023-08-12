import {
  Column,
  Container,
  Flexible,
  Widget,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
export default function Layout({
  padding = EdgeInsets.all(30),
  Title,
  Chart,
  backgroundColor = "white",
}: LayoutProps) {
  return Container({
    padding,
    color: backgroundColor,
    child: Column({
      children: [
        Title,
        Flexible({
          child: Chart,
        }),
      ],
    }),
  });
}

type LayoutProps = {
  backgroundColor?: string;
  padding?: EdgeInsets;
  Title: Widget;
  Chart: Widget;
};
