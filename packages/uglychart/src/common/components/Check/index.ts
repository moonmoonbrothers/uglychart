import { CustomPaint, Size } from "@moonmoonbrothers/flutterjs";
import Assets from "./assets";
const Check = () => {
  return CustomPaint({
    painter: {
      createDefaultSvgEl({ createSvgEl }) {
        const image = createSvgEl("image");
        return {
          image,
        };
      },
      paint({ image }, size) {
        image.setAttribute("height", `${size.height}`);
        image.setAttribute("width", `${size.width}`);
        image.setAttribute("href", `${Assets.check}`);
      },
    },
  });
};

export default Check;
