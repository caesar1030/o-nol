import FilterButton from '@/components/common-ui/filter-button';
import { ModeValue, selectedModeState } from '@/store/mode/atom';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import * as S from './styles';

const ModeSelector = () => {
  const [selectedMode, setSelectedMode] = useRecoilState(selectedModeState);

  const handleClick = (mode: ModeValue) => {
    const newMode = mode === selectedMode ? null : mode;
    setSelectedMode(newMode);
  };

  return (
    <S.ModeSelector>
      <FilterButton
        size="L"
        active={selectedMode === 'alone'}
        onClick={() => handleClick('alone')}
      >
        <Image
          src={'/images/mode-alone.svg'}
          alt="혼자 놀기"
          width={75}
          height={76}
        />
        <span>혼자 놀거에요</span>
      </FilterButton>
      <FilterButton
        size="L"
        active={selectedMode === 'together'}
        onClick={() => handleClick('together')}
      >
        <Image
          src={'/images/mode-together.svg'}
          alt="같이 놀기"
          width={75}
          height={76}
        />
        <span>같이 놀거에요</span>
      </FilterButton>
    </S.ModeSelector>
  );
};

export default ModeSelector;
