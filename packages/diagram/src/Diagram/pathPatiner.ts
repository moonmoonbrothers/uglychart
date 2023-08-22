import { Offset, Path } from "@moonmoonbrothers/flutterjs";
function pathPainter({
  path,
  from,
  to,
}: {
  from: Offset;
  to: Offset;
  path: Path;
}) {
  const corner1 = new Offset({ x: from.x, y: (from.y + to.y) / 2 });
  const corner2 = new Offset({ x: to.x, y: (from.y + to.y) / 2 });
  path
    .moveTo(from)
    .lineTo(corner1)
    .moveTo(corner1)
    .lineTo(corner2)
    .moveTo(corner2)
    .lineTo(to)
    .close();
}

export default pathPainter;
