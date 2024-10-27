import { FC } from 'react';
import Image from 'next/image';

const TextBlock: FC<{
  mainText: string
  highlightText: string
  description: string
  highlightImage?: {
    src: string
    alt: string
    styles: string
    width: number
    height: number
    scale?: number
  }
  header?: boolean
}> = ({ mainText, highlightText, description, highlightImage, header }) => (
  <p className={`sm:w-[35%]] w-full ${(header) ? '' : 'text-start text-3xl xl:text-4xl xl:leading-[3rem]'}
  font-bold text-dark-500`}
  >
    {mainText}
    {' '}
    <span className="relative inline-block">
      {highlightImage && (
        <Image
          src={highlightImage.src}
          alt={highlightImage.alt}
          className={highlightImage.styles}
          width={highlightImage.width}
          height={highlightImage.height}
          style={{
            transform: highlightImage.scale
              ? `scale(${highlightImage.scale})`
              : 'scale(1)',
          }}
        />
      )}
      <span className="text-primary">{highlightText}</span>
    </span>
    {' '}
    {description}
  </p>
);

export default TextBlock;
