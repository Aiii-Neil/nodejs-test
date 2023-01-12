export const commonEnv = {
  IS_DEV: process.env.IS_DEV === 'true',
  APIs: {
    api: process.env.APIs_api,
    platformPush: process.env.APIs_platformPush,
    platformPushAudienceClient: process.env.APIs_platformPushAudienceClient,
    basicWebhook: process.env.APIs_basicWebhook,
    lottery: [
      process.env.APIs_bottery_lottery01,
      process.env.APIs_bottery_lottery02,
      process.env.APIs_bottery_lottery03,
      process.env.APIs_bottery_lottery04,
      process.env.APIs_bottery_lottery05
    ],
    couponOnline: process.env.APIs_couponOnline,
    recommendation: process.env.APIs_recommendation,
    membership: process.env.APIs_membership
  },
  internalUrl: process.env.Internal_url,
  GKE: {
    internalBaseUrl: process.env.GKE_Interal_base_url
  }
};
