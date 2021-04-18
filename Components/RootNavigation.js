const config = {
  screens: {
    Main: 'main',
  },
};

export const linking = {
  prefixes: ["coachsync://app"],
  config
};

const tabConfig = {
  screens: {
    Prompts: "prompts",
    Concepts: "concepts",
    Messages: "messages"
  },
};

export const tabLinking = {
  prefixes: ["coachsync://app/tabs"],
  tabConfig,
};
