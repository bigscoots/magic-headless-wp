import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hovered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  bordered = false,
  hovered = false,
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };
  
  return (
    <div
      className={twMerge(
        'bg-white dark:bg-neutral-900 rounded-lg shadow-sm',
        bordered && 'border border-neutral-200 dark:border-neutral-800',
        hovered && 'transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={twMerge('mb-4', className)}>
    {children}
  </div>
);

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={twMerge('text-lg font-semibold leading-tight text-neutral-900 dark:text-white', className)}>
    {children}
  </h3>
);

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={twMerge('text-sm text-neutral-600 dark:text-neutral-400', className)}>
    {children}
  </p>
);

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={twMerge('text-neutral-700 dark:text-neutral-300', className)}>
    {children}
  </div>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={twMerge('mt-4 flex items-center', className)}>
    {children}
  </div>
);

export {
  Card
};