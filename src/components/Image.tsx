import { ComponentProps, useEffect, useState } from 'react';
import { promiseTimeout } from '../utils';
import { cn } from '../utils';

interface Props extends ComponentProps<'img'> {
  src: string;
  placeholderSrc?: string;
  width: number;
  height: number;
}

const LazyImage = ({ src, placeholderSrc, className, ...rest }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    const loadImage = async () => {
      if (!placeholderSrc) {
        return;
      }

      const img = new Image();

      const imgComplete = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });

      try {
        await promiseTimeout(20, imgComplete);
      } catch {
        setLoading(true);
        setImageSrc(placeholderSrc);

        img.onload = () => {
          setLoading(false);
          setImageSrc(src);
        };
      }
    };

    loadImage();
  }, [placeholderSrc, src]);

  return (
    <img
      className={cn(loading ? 'blur-md [clip-path:inset(0)]' : 'transition-[filter]', className)}
      src={imageSrc}
      {...rest}
    />
  );
};

export default LazyImage;
