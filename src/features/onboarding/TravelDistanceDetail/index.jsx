import { useState } from 'react';
import ProgressiveForm from '../../../ui/ProgressiveForm';
import Row from '../../../ui/Row';
import Map from './Map';
import DistanceInfo from './info';
import DistanceSlider from './slider';

const distanceConfig = [
  {
    id: 'under 250',
    distance: 250,
    label: '250m 이내',
  },
  {
    id: 'under 500',
    distance: 500,
    label: '500m 이내',
  },
  {
    id: 'under 1000',
    distance: 1000,
    label: '1km 이내',
  },
  {
    id: 'over 1000',
    distance: 2000,
    label: '1km 이상',
  },
];

function TravelDistanceDetail() {
  const [distanceIndex, setDistanceIndex] = useState(0);
  const { label, distance } = distanceConfig[distanceIndex];

  function handleDistanceChange(idx) {
    setDistanceIndex(idx);
  }

  return (
    <>
      <ProgressiveForm currentStep={3}>
        <ProgressiveForm.Elipse />
        <ProgressiveForm.Title>
          지금 내 위치에서
          <br /> 이동할 수 있는 거리를 알려주세요
        </ProgressiveForm.Title>
        <ProgressiveForm.Content>
          <Row type="vertical">
            <Map distance={distance} />
            <DistanceInfo distanceLabel={label} />
            <DistanceSlider
              distanceConfig={distanceConfig}
              distanceIndex={distanceIndex}
              onDistanceChange={handleDistanceChange}
            />
          </Row>
        </ProgressiveForm.Content>
        <ProgressiveForm.NextButton to="/result" selected>
          선택 완료
        </ProgressiveForm.NextButton>
      </ProgressiveForm>
    </>
  );
}
export default TravelDistanceDetail;
