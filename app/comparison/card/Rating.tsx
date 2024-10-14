import { FC, useEffect, useState } from 'react';
import { Rating as RatingComponent, Star } from '@smastrom/react-rating';

interface Props {
  value: number
  disabled?: boolean
  onChange: (value: number) => void
}

export const Rating: FC<Props> = ({ value, disabled, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState(value ?? 3);
  const [starsColoring, setStarsColoring] = useState(
    getStarsColoring(value).activeFillColor
  );

  function getStarsColoring(num?: number) {
    switch (num) {
      case 1:
        return { hoverFillColor: '#FF9999', activeFillColor: '#FF1D1D' };
      case 2:
        return { hoverFillColor: '#FFB570', activeFillColor: '#FF8C22' };
      case 3:
        return { hoverFillColor: '#FFE870', activeFillColor: '#ffcc00' };
      case 4:
        return { hoverFillColor: '#B2E6B4', activeFillColor: '#46C34C' };
      case 5:
        return { hoverFillColor: '#479F7899', activeFillColor: '#479F78' };
      default:
        return { hoverFillColor: '#D0D5DD', activeFillColor: '#D0D5DD' };
    }
  }

  useEffect(() => {
    if (hoverValue) {
      setStarsColoring(getStarsColoring(hoverValue).hoverFillColor);
      setCurrentValue(hoverValue);
    }
    else {
      setStarsColoring(getStarsColoring(value).activeFillColor);
      setCurrentValue(value);
    }
  }, [hoverValue]);

  useEffect(() => {
    setStarsColoring(disabled ? getStarsColoring(value).hoverFillColor : getStarsColoring(value).activeFillColor);
    setCurrentValue(value);
  }, [value, disabled]);

  return (
    <div className="flex items-center justify-between">
      <RatingComponent
        style={{ maxWidth: 220, gap: 10 }}
        value={currentValue}
        onChange={(value: number) => {
          onChange(value);
        }}
        onHoverChange={setHoverValue}
        isRequired={true}
        itemStyles={{
          itemShapes: Star,
          activeFillColor: starsColoring,
          inactiveFillColor: '#aaa',
        }}
        isDisabled={disabled}
      />
    </div>
  );
};
