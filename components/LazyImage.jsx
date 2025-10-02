"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className, 
  style, 
  priority = false,
  quality = 80,
  placeholder = "blur",
  blurDataURL,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  const shouldLoad = priority || hasIntersected;

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

  return (
    <div ref={ref} className={className} style={style}>
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={className}
          style={style}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          onLoad={() => setImageLoaded(true)}
          {...props}
        />
      ) : (
        <div 
          className={`bg-light d-flex align-items-center justify-content-center ${className}`}
          style={{ 
            width: width || '100%', 
            height: height || '200px',
            ...style 
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
