export const storageTools = [
  {
    name: 'azure_create_storage_account',
    description: 'Create a new Azure Storage Account with secure defaults that comply with Azure policies',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Storage account name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        sku: { type: 'string', description: 'Storage account SKU', enum: ['Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Premium_LRS'], default: 'Standard_LRS' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
        allowSharedKeyAccess: { type: 'boolean', description: 'Allow shared key access (local authentication)', default: false },
        requireInfrastructureEncryption: { type: 'boolean', description: 'Require infrastructure encryption for double encryption', default: true },
        minimumTlsVersion: { type: 'string', description: 'Minimum TLS version', enum: ['TLS1_0', 'TLS1_1', 'TLS1_2'], default: 'TLS1_2' },
        allowBlobPublicAccess: { type: 'boolean', description: 'Allow anonymous public read access to blobs', default: false },
        supportsHttpsTrafficOnly: { type: 'boolean', description: 'Allow only HTTPS traffic', default: true },
        networkAcls: {
          type: 'object',
          description: 'Network access control rules',
          properties: {
            defaultAction: { type: 'string', enum: ['Allow', 'Deny'], default: 'Deny' },
            bypass: { type: 'string', enum: ['None', 'AzureServices', 'Logging', 'Metrics'], default: 'AzureServices' }
          }
        }
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_storage_account',
    description: 'Get details of an Azure Storage Account',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Storage account name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_storage_accounts',
    description: 'List Azure Storage Accounts in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_storage_account',
    description: 'Delete an Azure Storage Account',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Storage account name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];