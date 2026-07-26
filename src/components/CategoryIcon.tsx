import React from 'react';

export type IconType =
  | 'cricket'
  | 'food'
  | 'gaming'
  | 'movies'
  | 'music'
  | 'fitness'
  | 'fashion'
  | 'travel'
  | 'trophy'
  | 'lightbulb'
  | 'search'
  | 'list'
  | 'clock'
  | 'sparkles'
  | 'swap'
  | 'quiz'
  | 'star'
  | 'rocket'
  | 'book'
  | 'brain'
  | 'badge'
  | 'share'
  | 'check'
  | 'refresh'
  | 'target';

interface CategoryIconProps {
  name: IconType;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'cricket':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      );
    case 'food':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.46 3.9 3.45 4.38L6 22h2l-.45-8.62C9.54 12.9 11 11.12 11 9zm7-7h-2c-1.66 0-3 1.34-3 3v8h2v9h2V2z" />
        </svg>
      );
    case 'gaming':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      );
    case 'movies':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      );
    case 'music':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      );
    case 'fitness':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 6.29 3.43 2 7.71 3.43 9.14 2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57 16.29 22 17.71 20.57 22 16.29 20.57 14.86z" />
        </svg>
      );
    case 'fashion':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
        </svg>
      );
    case 'travel':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      );
    case 'rocket':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M9.19 6.35c-2.04 2.29-3.44 5.2-3.84 8.36l2.12 2.12c3.16-.4 6.07-1.8 8.36-3.84L9.19 6.35zM13.17 4l6.83 6.83c.78-.78 1.4-1.68 1.83-2.66-1.55-1.55-3.6-2.56-5.83-2.83L13.17 4zM4 14.5c0 1.38.56 2.63 1.46 3.54L4 20l1.96-1.46C6.87 19.44 8.12 20 9.5 20c.5 0 .99-.07 1.46-.2l-2.76-2.76A4.957 4.957 0 014 14.5z" />
        </svg>
      );
    case 'book':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      );
    case 'brain':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.2 19.57 10.55 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
        </svg>
      );
    case 'badge':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      );
    case 'share':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
        </svg>
      );
    case 'target':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 6h2v2h-2z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
      );
    case 'trophy':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c2.24-.42 3.99-2.29 4.39-4.94C19.08 10.63 21 8.55 21 6V5h-2zm-12 3V7h2v3.8c-1.17-.38-2-1.47-2-2.8zm10 0c0 1.33-.83 2.42-2 2.8V7h2v1z" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C8.77 12.16 8 10.66 8 9c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.66-.77 3.16-2.15 4.1z" />
        </svg>
      );
    case 'search':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      );
    case 'list':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zm6 12l.9 2.1L21 18l-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1zM6 15l.9 2.1L9 18l-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
        </svg>
      );
    case 'swap':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
        </svg>
      );
    case 'quiz':
    case 'check':
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      );
    case 'star':
    default:
      return (
        <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
  }
};

export default CategoryIcon;
