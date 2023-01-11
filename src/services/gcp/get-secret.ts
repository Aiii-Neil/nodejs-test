import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

/*
  @description This function is used to get the secret from GCP Secret Manager.
  @example
    const secret = await getSecret('projects/123456789/secrets/foo/versions/latest');
 */
export const getSecret = async (secretManagerPath: string) => {
  if (!secretManagerPath) {
    throw new Error('secretManagerPath is not defined.');
  }
  const client = new SecretManagerServiceClient();
  const [accessResponse] = await client.accessSecretVersion({
    name: secretManagerPath
  });
  const responsePayload = accessResponse?.payload?.data?.toString();
  if (responsePayload) {
    return responsePayload;
  }

  throw new Error('secret not found');
};
