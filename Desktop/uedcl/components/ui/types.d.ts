import * as React from 'react';

declare module '@/components/ui/skeleton' {
  export interface SkeletonProps {
    className?: string;
  }
  
  export function Skeleton(props: SkeletonProps): JSX.Element;
}

declare module '@/components/ui/alert' {
  import { VariantProps } from 'class-variance-authority';
  
  const alertVariants: any;
  
  export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}
  
  export function Alert(props: AlertProps): JSX.Element;
  
  export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
  
  export function AlertTitle(props: AlertTitleProps): JSX.Element;
  
  export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
  
  export function AlertDescription(props: AlertDescriptionProps): JSX.Element;
} 