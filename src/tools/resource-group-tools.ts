export const resourceGroupTools = [
  {
    name: 'azure_create_resource_group',
    description: 'Create a new Azure Resource Group with smart defaults',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Resource group name' },
        location: { type: 'string', description: 'Azure region (e.g., eastus, westus2)', default: 'eastus' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
        tags: { type: 'object', description: 'Tags to apply to the resource group', additionalProperties: { type: 'string' } },
      },
      required: ['name'],
    },
  },
  {
    name: 'azure_get_resource_group',
    description: 'Get details of an Azure Resource Group',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'azure_list_resource_groups',
    description: 'List all Azure Resource Groups in a subscription',
    inputSchema: {
      type: 'object',
      properties: {
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_resource_group',
    description: 'Delete an Azure Resource Group and all its resources',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
        force: { type: 'boolean', description: 'Force deletion without confirmation', default: false },
      },
      required: ['name'],
    },
  },
];