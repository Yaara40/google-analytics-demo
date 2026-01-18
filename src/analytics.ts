import ReactGA from "react-ga4";

// Measurement ID - בפרודקשן זה יהיה ID אמיתי מ-Google Analytics Console
const MEASUREMENT_ID = "G-NHRSJ3VKRQ";

// אתחול Google Analytics
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      debug_mode: true, // מצב דיבאג - לראות events בקונסול
    },
  });
  console.log("Google Analytics initialized");
};

// פונקציה למעקב אחרי page views
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// פונקציה למעקב אחרי לחיצות על כפתורים
export const trackButtonClick = (buttonName: string) => {
  ReactGA.event({
    category: "User Interaction",
    action: "Button Click",
    label: buttonName,
  });
  console.log(`Button clicked: ${buttonName}`);
};
