import React from 'react';

export function Card({ children, className, ...props }) {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden bg-transparent border border-gray-600 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, ...props }) {
  return <div className="p-4 bg-transparent" {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }) {
  return <h2 className="text-xl font-bold text-white" {...props}>{children}</h2>;
}

export function CardDescription({ children, ...props }) {
  return <p className="text-gray-300" {...props}>{children}</p>;
}

export function CardContent({ children, ...props }) {
  return <div className="p-4 text-white" {...props}>{children}</div>;
}
