import { DefaultAzureCredential, TokenCredential } from '@azure/identity';

export class AzureAuth {
  private credential: TokenCredential;
  private defaultSubscriptionId?: string;

  constructor() {
    this.credential = new DefaultAzureCredential();
    this.defaultSubscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
  }

  getCredential(): TokenCredential {
    return this.credential;
  }

  getSubscriptionId(provided?: string): string {
    if (provided) {
      return provided;
    }

    if (this.defaultSubscriptionId) {
      return this.defaultSubscriptionId;
    }

    throw new Error(
      'No subscription ID provided and AZURE_SUBSCRIPTION_ID environment variable is not set. ' +
      'Please provide a subscription ID or set the AZURE_SUBSCRIPTION_ID environment variable.'
    );
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const token = await this.credential.getToken(['https://management.azure.com/.default']);
      return !!token;
    } catch (error) {
      console.error('Azure credential validation failed:', error);
      return false;
    }
  }
}