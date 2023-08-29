import { dedent } from 'ts-dedent';
import { Container, BoxDecoration, BoxShadow } from '@moonmoonbrothers/flutterjs';
import { BarChart } from '@moonmoonbrothers/uglychart';
const CustomBar = {
	widget: BarChart({
		data: {
			title: 'Title',
			labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
			datasets: [
				{
					legend: 'A',
					data: [30, 40.5, 50.12, 30.5, 40]
				},
				{
					legend: 'B',
					data: [60, 20.5, 20.2, 22.5, 10]
				},
				{
					legend: 'C',
					data: [6, 10.5, 20.2, 12.5, 1]
				}
			]
		},
		custom: {
			bar: {
				type: 'custom',
				Custom(child, { legend, backgroundColor }) {
					return Container({
						decoration: new BoxDecoration({
							color: backgroundColor,
							boxShadow: legend === 'B' ? [new BoxShadow({ color: 'black', blurRadius: 5 })] : []
						}),
						width: legend === 'B' ? 30 : 15
					});
				}
			}
		}
	}),
	code: dedent`
    import { Container, BoxDecoration, BoxShadow } from '@moonmoonbrothers/flutterjs';
		import { BarChart } from '@moonmoonbrothers/uglychart';

    BarChart({
      data: {
        title: 'Title',
        labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
        datasets: [
          {
            legend: 'A',
            data: [30, 40.5, 50.12, 30.5, 40]
          },
          {
            legend: 'B',
            data: [60, 20.5, 20.2, 22.5, 10]
          },
          {
            legend: 'C',
            data: [6, 10.5, 20.2, 12.5, 1]
          }
        ]
      },
      custom: {
        bar: {
          type: 'custom',
          Custom(child, { legend, backgroundColor }) {
            return Container({
              decoration: new BoxDecoration({
                color: backgroundColor,
                boxShadow: legend === 'B' ? [new BoxShadow({ color: 'black', blurRadius: 5 })] : []
              }),
              width: legend === 'B' ? 30 : 15
            });
          }
        }
      }
    })
	`
};

export default CustomBar;
