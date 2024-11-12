import { FC } from 'react';
import Image from 'next/image';

const TextBlock: FC<{
  mainText: string
  highlightText: string
  midtext?: string
  maintext2?: string
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
  endImage?: {
    src: string
    alt: string
    styles: string
    width: number
    height: number
    scale?: number
  }
}> = ({ mainText, highlightText, description, highlightImage, midtext, maintext2, header, endImage }) => (
  <p className={`w-full ${(header) ? '' : 'text-start text-3xl xl:text-4xl xl:leading-[3rem]'}
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
    {midtext && <span>{midtext}</span>}
    {' '}
    {maintext2 && <span className="text-primary">{maintext2}</span>}
    {' '}
    <span className="relative inline">
      <span>{description}</span>
      {endImage && (
        <Image
          src={endImage.src}
          alt={endImage.alt}
          className={endImage.styles}
          width={endImage.width}
          height={endImage.height}
          style={{
            transform: endImage.scale
              ? `scale(${endImage.scale})`
              : 'scale(1)',
          }}
        />
      )}
    </span>
  </p>
);

export default TextBlock;
