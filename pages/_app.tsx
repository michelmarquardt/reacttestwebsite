import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider, useFeature } from "@growthbook/growthbook-react";


// Create a GrowthBook instance
const growthbook = new GrowthBook({
  // enableDevMode: true allows you to use the Chrome DevTools Extension to test/debug.
  enableDevMode: true,
  // Callback when a user is put into an A/B experiment
  trackingCallback: (experiment, result) => {
    console.log("Experiment Viewed", {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const FEATURES_ENDPOINT = "http://localhost:3100/api/features/prod_NMWLrDODi3iTeNgRClOycyeU0Vg8mgsHMuA4e40W5Q";

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    // Load feature definitions from GrowthBook API
    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => growthbook.setFeatures(json.features))
      .catch((e) => console.error("Failed to fetch features", e));

    // Set user attributes for targeting (from cookie, auth system, etc.)
    growthbook.setAttributes({
      id: "456", //123 - A/B nicht getriggert, 456 - A/B getriggert.
      company: "test",
    });
  }, []);
  
  

  return (
    <GrowthBookProvider>
      <Component {...pageProps}/>
    </GrowthBookProvider>
  )
}
