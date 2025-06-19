export const databaseTools = [
  // Cosmos DB Tools
  {
    name: 'azure_create_cosmos_db',
    description: 'Create a new Azure Cosmos DB account',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Cosmos DB account name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        apiType: { type: 'string', description: 'API type', enum: ['Sql', 'MongoDB', 'Cassandra', 'Table', 'Gremlin'], default: 'Sql' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_cosmos_db',
    description: 'Get details of an Azure Cosmos DB account',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Cosmos DB account name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_cosmos_db',
    description: 'List Azure Cosmos DB accounts in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_cosmos_db',
    description: 'Delete an Azure Cosmos DB account',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Cosmos DB account name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },

  // Redis Cache Tools
  {
    name: 'azure_create_redis_cache',
    description: 'Create a new Azure Redis Cache',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Redis cache name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        sku: { type: 'string', description: 'Redis cache SKU', enum: ['Basic', 'Standard', 'Premium'], default: 'Basic' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_get_redis_cache',
    description: 'Get details of an Azure Redis Cache',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Redis cache name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_redis_cache',
    description: 'List Azure Redis Caches in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_delete_redis_cache',
    description: 'Delete an Azure Redis Cache',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Redis cache name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];