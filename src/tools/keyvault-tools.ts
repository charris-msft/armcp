export const keyVaultTools = [
  {
    name: 'azure_create_key_vault',
    description: 'Create a new Azure Key Vault with secure defaults',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Key Vault name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_key_vault',
    description: 'Get details of an Azure Key Vault',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Key Vault name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_key_vaults',
    description: 'List Azure Key Vaults in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_key_vault',
    description: 'Delete an Azure Key Vault',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Key Vault name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];