//import { useFeature, IfFeatureEnabled } from '@growthbook/growthbook-react'
import Version1 from './version1';
import Version2 from './version2';
import { useFeature } from '@kameleoon/react-sdk/dist/useFeature';
import { useVisitorCode } from '@kameleoon/react-sdk/dist/useVisitorCode';
import { KameleoonException } from '@kameleoon/react-sdk/dist/constants';

export default function Home() {
  //const buttonColorChange = useFeature("button-color").on;
  /*
  if (buttonColorChange) {
    return (
      <Version2></Version2>
    )
  } else {
    return (
      <Version1></Version1>
    )
  }
  */

  const { getVisitorCode } = useVisitorCode();
  const { feature, errors } = useFeature({
      featureKey: "_ndern_der_farbe_eines_testbuttons",
      variableKeys: { production: '_ndern_der_farbe_eines_testbuttons'},
      visitorCode: getVisitorCode("https://reacttestwebsite.netlify.app/"),
  });


  const { isActive, variables } = feature;

  if (isActive) {
    return (
      <Version2></Version2>
    )
  } else {
    return (
      <Version1></Version1>
    )
  }
  
}
