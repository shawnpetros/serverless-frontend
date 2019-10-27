export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "shawns-notes-app-upload"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://w9w12khn0l.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_ovnbkH1zR",
        APP_CLIENT_ID: "2f7h8jtkf6u62uk39ivq6ap2hq",
        IDENTITY_POOL_ID: "us-east-1:4af69d44-4d8f-4fdc-82ed-24360205ba78"
    }
};
