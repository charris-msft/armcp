import { ResourceManagementClient, ResourceGroup } from '@azure/arm-resources';
import { StorageManagementClient, StorageAccount } from '@azure/arm-storage';
import { WebSiteManagementClient, Site, AppServicePlan } from '@azure/arm-appservice';
import { ComputeManagementClient, VirtualMachine } from '@azure/arm-compute';
import { SqlManagementClient, Database, Server as SqlServer } from '@azure/arm-sql';
import { KeyVaultManagementClient, Vault } from '@azure/arm-keyvault';
import { ContainerInstanceManagementClient, ContainerGroup } from '@azure/arm-containerinstance';
import { NetworkManagementClient, VirtualNetwork } from '@azure/arm-network';
import { CosmosDBManagementClient, DatabaseAccountCreateUpdateParameters } from '@azure/arm-cosmosdb';
import { RedisManagementClient, RedisResource } from '@azure/arm-rediscache';
import { ContainerRegistryManagementClient, Registry } from '@azure/arm-containerregistry';
import { AzureAuth } from './auth.js';
import { SmartDefaults } from './smart-defaults.js';

export interface CreateResourceGroupParams {
  name: string;
  location: string;
  subscriptionId?: string;
  tags?: Record<string, string>;
}

export interface GetResourceGroupParams {
  name: string;
  subscriptionId?: string;
}

export interface ListResourceGroupsParams {
  subscriptionId?: string;
}

export interface DeleteResourceGroupParams {
  name: string;
  subscriptionId?: string;
  force?: boolean;
}

export interface CreateStorageAccountParams {
  name: string;
  resourceGroupName: string;
  location: string;
  sku: string;
  subscriptionId?: string;
}

export interface CreateWebAppParams {
  name: string;
  resourceGroupName: string;
  location: string;
  runtime: string;
  tier: string;
  subscriptionId?: string;
}

export interface CreateVirtualMachineParams {
  name: string;
  resourceGroupName: string;
  location: string;
  size: string;
  adminUsername: string;
  adminPassword?: string;
  sshPublicKey?: string;
  operatingSystem: 'Windows' | 'Linux';
  subscriptionId?: string;
}

export interface CreateSqlDatabaseParams {
  name: string;
  serverName: string;
  resourceGroupName: string;
  location: string;
  adminLogin: string;
  adminPassword: string;
  subscriptionId?: string;
}

export interface CreateKeyVaultParams {
  name: string;
  resourceGroupName: string;
  location: string;
  subscriptionId?: string;
}

export interface CreateContainerInstanceParams {
  name: string;
  resourceGroupName: string;
  location: string;
  image: string;
  cpu: number;
  memory: number;
  subscriptionId?: string;
}

export interface CreateVirtualNetworkParams {
  name: string;
  resourceGroupName: string;
  location: string;
  addressSpace: string;
  subscriptionId?: string;
}

export interface CreateCosmosDbParams {
  name: string;
  resourceGroupName: string;
  location: string;
  apiType: 'Sql' | 'MongoDB' | 'Cassandra' | 'Table' | 'Gremlin';
  subscriptionId?: string;
}

export interface CreateRedisCacheParams {
  name: string;
  resourceGroupName: string;
  location: string;
  sku: 'Basic' | 'Standard' | 'Premium';
  subscriptionId?: string;
}

export interface CreateContainerRegistryParams {
  name: string;
  resourceGroupName: string;
  location: string;
  sku: 'Basic' | 'Standard' | 'Premium';
  subscriptionId?: string;
}

export class AzureResourceManager {
  private auth: AzureAuth;
  private smartDefaults: SmartDefaults;

  constructor() {
    this.auth = new AzureAuth();
    this.smartDefaults = new SmartDefaults();
  }

  private getResourceClient(subscriptionId: string): ResourceManagementClient {
    return new ResourceManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getStorageClient(subscriptionId: string): StorageManagementClient {
    return new StorageManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getWebSiteClient(subscriptionId: string): WebSiteManagementClient {
    return new WebSiteManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getComputeClient(subscriptionId: string): ComputeManagementClient {
    return new ComputeManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getSqlClient(subscriptionId: string): SqlManagementClient {
    return new SqlManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getKeyVaultClient(subscriptionId: string): KeyVaultManagementClient {
    return new KeyVaultManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getContainerInstanceClient(subscriptionId: string): ContainerInstanceManagementClient {
    return new ContainerInstanceManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getNetworkClient(subscriptionId: string): NetworkManagementClient {
    return new NetworkManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getCosmosDbClient(subscriptionId: string): CosmosDBManagementClient {
    return new CosmosDBManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getRedisClient(subscriptionId: string): RedisManagementClient {
    return new RedisManagementClient(this.auth.getCredential(), subscriptionId);
  }

  private getContainerRegistryClient(subscriptionId: string): ContainerRegistryManagementClient {
    return new ContainerRegistryManagementClient(this.auth.getCredential(), subscriptionId);
  }

  async createResourceGroup(params: CreateResourceGroupParams): Promise<ResourceGroup> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);
    const client = this.getResourceClient(subscriptionId);

    const resourceGroupParams: ResourceGroup = {
      location: params.location,
      tags: {
        ...this.smartDefaults.getDefaultTags(),
        ...params.tags,
      },
    };

    const result = await client.resourceGroups.createOrUpdate(
      params.name,
      resourceGroupParams
    );

    return result;
  }

  async getResourceGroup(params: GetResourceGroupParams): Promise<ResourceGroup> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);
    const client = this.getResourceClient(subscriptionId);

    const result = await client.resourceGroups.get(params.name);
    return result;
  }

  async listResourceGroups(params: ListResourceGroupsParams): Promise<ResourceGroup[]> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);
    const client = this.getResourceClient(subscriptionId);

    const result = [];
    for await (const resourceGroup of client.resourceGroups.list()) {
      result.push(resourceGroup);
    }

    return result;
  }

  async deleteResourceGroup(params: DeleteResourceGroupParams): Promise<void> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);
    const client = this.getResourceClient(subscriptionId);

    if (!params.force) {
      console.warn(`Deleting resource group '${params.name}' and all its resources. This cannot be undone.`);
    }

    await client.resourceGroups.beginDeleteAndWait(params.name);
  }

  async createStorageAccount(params: CreateStorageAccountParams): Promise<StorageAccount> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getStorageClient(subscriptionId);

    const storageAccountParams = {
      location: params.location,
      sku: {
        name: params.sku,
      },
      kind: 'StorageV2' as const,
      accessTier: 'Hot' as const,
      allowBlobPublicAccess: false,
      supportsHttpsTrafficOnly: true,
      minimumTlsVersion: 'TLS1_2' as const,
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.storageAccounts.beginCreateAndWait(
      params.resourceGroupName,
      params.name,
      storageAccountParams
    );

    return result;
  }

  async createWebApp(params: CreateWebAppParams): Promise<Site> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getWebSiteClient(subscriptionId);

    const appServicePlanName = `${params.name}-plan`;
    
    const appServicePlanParams: AppServicePlan = {
      location: params.location,
      sku: {
        name: this.smartDefaults.getAppServicePlanSku(params.tier),
        tier: params.tier,
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const appServicePlan = await client.appServicePlans.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      appServicePlanName,
      appServicePlanParams
    );

    const webAppParams: Site = {
      location: params.location,
      serverFarmId: appServicePlan.id,
      siteConfig: {
        ...this.smartDefaults.getWebAppConfig(params.runtime),
        httpsOnly: true,
        minTlsVersion: '1.2',
      },
      httpsOnly: true,
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.webApps.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      webAppParams
    );

    return result;
  }

  async createVirtualMachine(params: CreateVirtualMachineParams): Promise<VirtualMachine> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const computeClient = this.getComputeClient(subscriptionId);
    const networkClient = this.getNetworkClient(subscriptionId);

    const vnetName = `${params.name}-vnet`;
    const subnetName = `${params.name}-subnet`;
    const nicName = `${params.name}-nic`;
    const nsgName = `${params.name}-nsg`;
    const pipName = `${params.name}-pip`;

    await this.ensureVirtualNetwork({
      name: vnetName,
      resourceGroupName: params.resourceGroupName,
      location: params.location,
      addressSpace: '10.0.0.0/16',
      subscriptionId,
    });

    const vmParams = {
      location: params.location,
      hardwareProfile: {
        vmSize: params.size,
      },
      storageProfile: this.smartDefaults.getVmStorageProfile(params.operatingSystem),
      osProfile: this.smartDefaults.getVmOsProfile(
        params.name,
        params.adminUsername,
        params.adminPassword,
        params.sshPublicKey,
        params.operatingSystem
      ),
      networkProfile: {
        networkInterfaces: [
          {
            id: `/subscriptions/${subscriptionId}/resourceGroups/${params.resourceGroupName}/providers/Microsoft.Network/networkInterfaces/${nicName}`,
            primary: true,
          },
        ],
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      vmParams
    );

    return result;
  }

  async createSqlDatabase(params: CreateSqlDatabaseParams): Promise<Database> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getSqlClient(subscriptionId);

    const serverParams = {
      location: params.location,
      administratorLogin: params.adminLogin,
      administratorLoginPassword: params.adminPassword,
      version: '12.0',
      tags: this.smartDefaults.getDefaultTags(),
    };

    await client.servers.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.serverName,
      serverParams
    );

    const databaseParams = {
      location: params.location,
      sku: {
        name: 'Basic',
        tier: 'Basic',
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.databases.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.serverName,
      params.name,
      databaseParams
    );

    return result;
  }

  async createKeyVault(params: CreateKeyVaultParams): Promise<Vault> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getKeyVaultClient(subscriptionId);

    const vaultParams = {
      location: params.location,
      properties: {
        sku: {
          family: 'A' as any,
          name: 'standard' as any,
        },
        tenantId: process.env.AZURE_TENANT_ID || 'your-tenant-id',
        accessPolicies: [],
        enabledForDeployment: false,
        enabledForDiskEncryption: false,
        enabledForTemplateDeployment: false,
        enableSoftDelete: true,
        softDeleteRetentionInDays: 90,
        enableRbacAuthorization: true,
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.vaults.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      vaultParams
    );

    return result;
  }

  async createContainerInstance(params: CreateContainerInstanceParams): Promise<ContainerGroup> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getContainerInstanceClient(subscriptionId);

    const containerGroupParams = {
      location: params.location,
      containers: [
        {
          name: params.name,
          image: params.image,
          resources: {
            requests: {
              cpu: params.cpu,
              memoryInGB: params.memory,
            },
          },
          ports: [
            {
              port: 80,
              protocol: 'TCP',
            },
          ],
        },
      ],
      osType: 'Linux',
      restartPolicy: 'Always',
      ipAddress: {
        type: 'Public',
        ports: [
          {
            port: 80,
            protocol: 'TCP',
          },
        ],
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.containerGroups.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      containerGroupParams
    );

    return result;
  }

  async createVirtualNetwork(params: CreateVirtualNetworkParams): Promise<VirtualNetwork> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getNetworkClient(subscriptionId);

    const vnetParams = {
      location: params.location,
      addressSpace: {
        addressPrefixes: [params.addressSpace],
      },
      subnets: [
        {
          name: 'default',
          addressPrefix: params.addressSpace.replace('/16', '/24'),
        },
      ],
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      vnetParams
    );

    return result;
  }

  async createCosmosDb(params: CreateCosmosDbParams): Promise<any> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getCosmosDbClient(subscriptionId);

    const cosmosParams = {
      location: params.location,
      locations: [
        {
          locationName: params.location,
          failoverPriority: 0,
        },
      ],
      databaseAccountOfferType: 'Standard' as any,
      capabilities: this.smartDefaults.getCosmosDbCapabilities(params.apiType),
      consistencyPolicy: {
        defaultConsistencyLevel: 'Session' as any,
      },
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.databaseAccounts.beginCreateOrUpdateAndWait(
      params.resourceGroupName,
      params.name,
      cosmosParams
    );

    return result;
  }

  async createRedisCache(params: CreateRedisCacheParams): Promise<RedisResource> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getRedisClient(subscriptionId);

    const redisParams = {
      location: params.location,
      sku: {
        name: params.sku,
        family: params.sku === 'Premium' ? 'P' : 'C',
        capacity: 0,
      },
      enableNonSslPort: false,
      minimumTlsVersion: '1.2',
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.redis.beginCreateAndWait(
      params.resourceGroupName,
      params.name,
      redisParams
    );

    return result;
  }

  async createContainerRegistry(params: CreateContainerRegistryParams): Promise<Registry> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);

    await this.ensureResourceGroupExists(params.resourceGroupName, params.location, subscriptionId);

    const client = this.getContainerRegistryClient(subscriptionId);

    const registryParams = {
      location: params.location,
      sku: {
        name: params.sku,
      },
      adminUserEnabled: false,
      tags: this.smartDefaults.getDefaultTags(),
    };

    const result = await client.registries.beginCreateAndWait(
      params.resourceGroupName,
      params.name,
      registryParams
    );

    return result;
  }

  private async ensureVirtualNetwork(params: CreateVirtualNetworkParams): Promise<void> {
    const subscriptionId = this.auth.getSubscriptionId(params.subscriptionId);
    const client = this.getNetworkClient(subscriptionId);

    try {
      await client.virtualNetworks.get(params.resourceGroupName, params.name);
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log(`Virtual network '${params.name}' does not exist. Creating it...`);
        await this.createVirtualNetwork(params);
      } else {
        throw error;
      }
    }
  }

  private async ensureResourceGroupExists(
    resourceGroupName: string,
    location: string,
    subscriptionId: string
  ): Promise<void> {
    const client = this.getResourceClient(subscriptionId);

    try {
      await client.resourceGroups.get(resourceGroupName);
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log(`Resource group '${resourceGroupName}' does not exist. Creating it...`);
        await this.createResourceGroup({
          name: resourceGroupName,
          location,
          subscriptionId,
        });
      } else {
        throw error;
      }
    }
  }
}