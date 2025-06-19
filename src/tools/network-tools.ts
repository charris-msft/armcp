export const networkTools = [
  {
    name: 'azure_create_virtual_network',
    description: 'Create a new Azure Virtual Network',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual network name' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        addressSpace: { type: 'string', description: 'Address space in CIDR notation', default: '10.0.0.0/16' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_virtual_network',
    description: 'Get details of an Azure Virtual Network',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual network name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_virtual_networks',
    description: 'List Azure Virtual Networks in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_virtual_network',
    description: 'Delete an Azure Virtual Network',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual network name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];