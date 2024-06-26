import { allDistanceState, selectedDistanceState } from '@/store/distance/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedDistanceIndexState } from '@/store/distance/selectors';
import * as S from './styles';

const Slider = () => {
  const distanceConfigs = useRecoilValue(allDistanceState);
  const [selectedDistance, setSelectedDistance] = useRecoilState(
    selectedDistanceState
  );
  const selectedDistanceIndex = useRecoilValue(selectedDistanceIndexState);

  const minValue = 0;
  const maxValue = distanceConfigs.length - 1;

  const handleValueChange = ([index]: number[]) => {
    setSelectedDistance(distanceConfigs[index].distance);
  };

  return (
    <S.Slider>
      <S.Root
        min={minValue}
        max={maxValue}
        value={[selectedDistanceIndex]}
        onValueChange={handleValueChange}
      >
        <S.Track>
          <S.Range />
        </S.Track>
        <S.Thumb
          aria-label="이동 가능한 거리를 선택하세요"
          aria-valuemin={distanceConfigs[0].distance}
          aria-valuemax={distanceConfigs[distanceConfigs.length - 1].distance}
          aria-valuenow={selectedDistance}
          aria-valuetext={distanceConfigs[selectedDistanceIndex].label}
        />
        <S.ValueContainer>
          {distanceConfigs.map(({ label }) => (
            <S.Value key={label} />
          ))}
        </S.ValueContainer>
      </S.Root>

      <S.LabelContainer>
        {distanceConfigs.map(({ label, distance }) => (
          <S.Label key={label} isVisible={selectedDistance === distance}>
            {label}
          </S.Label>
        ))}
      </S.LabelContainer>
    </S.Slider>
  );
};

export default Slider;
