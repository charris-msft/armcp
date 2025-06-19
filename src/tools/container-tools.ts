export const containerTools = [
  // Container Instance Tools
  {
    name: 'azure_create_container_instance',
    description: 'Create a new Azure Container Instance',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container instance name' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        image: { type: 'string', description: 'Container image (e.g., nginx:latest)', default: 'nginx:latest' },
        cpu: { type: 'number', description: 'CPU cores', default: 1 },
        memory: { type: 'number', description: 'Memory in GB', default: 1.5 },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_container_instance',
    description: 'Get details of an Azure Container Instance',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container instance name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_container_instances',
    description: 'List Azure Container Instances in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_container_instance',
    description: 'Delete an Azure Container Instance',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container instance name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },

  // Container Registry Tools
  {
    name: 'azure_create_container_registry',
    description: 'Create a new Azure Container Registry',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container registry name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        sku: { type: 'string', description: 'Container registry SKU', enum: ['Basic', 'Standard', 'Premium'], default: 'Basic' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_container_registry',
    description: 'Get details of an Azure Container Registry',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container registry name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_container_registries',
    description: 'List Azure Container Registries in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_container_registry',
    description: 'Delete an Azure Container Registry',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Container registry name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];