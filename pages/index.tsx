import { useFeature, IfFeatureEnabled } from '@growthbook/growthbook-react'
import Version1 from './version1';
import Version2 from './version2';

export default function Home() {
  const buttonColorChange = useFeature("button-color").on;
  
  if (buttonColorChange) {
    return (
      <Version2></Version2>
    )
  } else {
    return (
      <Version1></Version1>
    )
  }
}
