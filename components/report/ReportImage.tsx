'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { ImageBlock } from '@/types/report';

export function ReportImage({ image, priority = false }: { image: ImageBlock; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="my-5 break-inside-avoid">
      <div className="relative overflow-hidden border-2 border-[#111] bg-white">
        {image.example_only && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-[#111] px-3 py-1 text-xs font-semibold text-white">
            Example only
          </span>
        )}
        {failed ? (
          <div role="img" aria-label={image.alt} className="flex min-h-40 items-center justify-center bg-[#fdf3dc] p-6 text-center text-sm text-neutral-600">
            Image unavailable: {image.alt}
          </div>
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 760px"
            priority={priority}
            onError={() => setFailed(true)}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
      {image.caption && <figcaption className="mt-2 text-center text-sm text-neutral-500">{image.caption}</figcaption>}
    </figure>
  );
}