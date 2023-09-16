// import { BuildContext, Widget } from "@moonmoonbrothers/flutterjs";
// import { Bar as DefaultBar } from "./default";
// import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
// import type { Custom } from "../types";

// export type TooltipProps = {
//   position: "top";
//   value: number;
//   label: string;
//   legend: {
//     name: string;
//     color: string;
//   };
// };

// export type BarConfig = {
//   thickness?: number;
// };

// const defaultBarConfig = {
//   thickness: 16,
// };

// export class Bar extends CartesianChartContextWidget<Custom> {
//   constructor(private props: TooltipProps) {
//     super();
//   }

//   build(context: BuildContext): Widget {
//     const theme = this.getTheme(context);
//     const data = this.getData(context);
//     const { bar } = this.getCustom(context);

//     const {
//       legendColor: backgroundColor,
//       index,
//       label,
//       legend,
//       direction,
//     } = this.props;

//     if (bar.type === "custom") {
//       return bar.Custom(
//         {},
//         {
//           backgroundColor,
//           index,
//           theme,
//           label,
//           legend,
//           data,
//           direction,
//         }
//       );
//     }

//     const { thickness = defaultBarConfig.thickness } = bar;

//     return DefaultBar({
//       color: backgroundColor,
//       direction,
//       thickness,
//     });
//   }
// }

// export default (props: TooltipProps) => new Bar(props);
