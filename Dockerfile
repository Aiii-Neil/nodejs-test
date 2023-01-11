FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
ENV TZ=Asia/Taipei;
ENV GOOGLE_APPLICATION_CREDENTIALS=/etc/gcp-sa/application_default_credentials.json
ENV GOOGLE_CLOUD_PROJECT=aiii-developer
ENV APIs_api=https://api-v2-5uvz3vc6ga-de.a.run.app
ENV APIs_platformPush=https://platform-push-v1-5uvz3vc6ga-de.a.run.app
ENV APIs_platformPushAudienceClient=https://platform-push-audience-client-5uvz3vc6ga-de.a.run.app
ENV APIs_basicWebhook=https://prod-line-dialogflow-5uvz3vc6ga-de.a.run.app
ENV APIs_bottery_lottery01=https://api-lottery-01-5uvz3vc6ga-de.a.run.app
ENV APIs_bottery_lottery02=https://api-lottery-02-5uvz3vc6ga-de.a.run.app
ENV APIs_bottery_lottery03=https://api-lottery-03-5uvz3vc6ga-de.a.run.app
ENV APIs_bottery_lottery04=https://api-lottery-04-5uvz3vc6ga-de.a.run.app
ENV APIs_bottery_lottery05=https://api-lottery-05-5uvz3vc6ga-de.a.run.app
ENV APIs_couponOnline=https://api-coupon-online-5uvz3vc6ga-de.a.run.app
ENV APIs_recommendation=https://recommendation-5uvz3vc6ga-de.a.run.app
ENV pubSub_topic_path=projects/aiii-bot-platform/topics/log-firestore-to-big-query
ENV firestorTwUrl=https://aiii-developer-tw.firebaseio.com
ENV firestorUsUrl=https://aiii-developer.firebaseio.com
ENV TW_FIREBASE_CERTIFICATE_PATH=projects/700749202278/secrets/tw-dev-firebase-service-account/versions/1
EXPOSE 8080
CMD [ "npm", "start" ]
