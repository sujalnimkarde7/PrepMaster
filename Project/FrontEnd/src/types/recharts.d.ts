import { FC, SVGProps } from 'react';

declare module 'recharts' {
  interface LineChartProps {
    data?: any[];
    children?: React.ReactNode;
  }

  interface AxisProps {
    dataKey?: string;
    stroke?: string;
  }

  interface LineProps {
    type?: 'monotone' | 'linear';
    dataKey: string;
    stroke?: string;
    strokeWidth?: number;
    dot?: boolean | object;
  }

  interface TooltipProps {
    contentStyle?: React.CSSProperties;
  }

  interface ResponsiveContainerProps {
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode;
  }

  export const LineChart: FC<LineChartProps>;
  export const Line: FC<LineProps>;
  export const XAxis: FC<AxisProps>;
  export const YAxis: FC<AxisProps>;
  export const CartesianGrid: FC<SVGProps<SVGPathElement>>;
  export const Tooltip: FC<TooltipProps>;
  export const ResponsiveContainer: FC<ResponsiveContainerProps>;
} 