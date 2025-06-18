export const azureTools = [
  // Resource Group Tools
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

  // Storage Account Tools
  {
    name: 'azure_create_storage_account',
    description: 'Create a new Azure Storage Account with smart defaults',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Storage account name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        sku: { type: 'string', description: 'Storage account SKU', enum: ['Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Premium_LRS'], default: 'Standard_LRS' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },

  // Web App Tools
  {
    name: 'azure_create_web_app',
    description: 'Create a new Azure App Service Web App with automatic App Service Plan creation',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        runtime: { type: 'string', description: 'Runtime stack', enum: ['node', 'dotnet', 'python', 'java', 'php'], default: 'node' },
        tier: { type: 'string', description: 'App Service Plan tier', enum: ['Free', 'Basic', 'Standard', 'Premium'], default: 'Free' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },

  // Virtual Machine Tools
  {
    name: 'azure_create_virtual_machine',
    description: 'Create a new Azure Virtual Machine with automatic networking setup',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        size: { type: 'string', description: 'VM size', default: 'Standard_B2s' },
        adminUsername: { type: 'string', description: 'Administrator username' },
        adminPassword: { type: 'string', description: 'Administrator password (required for Windows)' },
        sshPublicKey: { type: 'string', description: 'SSH public key (for Linux VMs)' },
        operatingSystem: { type: 'string', description: 'Operating system', enum: ['Windows', 'Linux'], default: 'Linux' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName', 'adminUsername'],
    },
  },

  // SQL Database Tools
  {
    name: 'azure_create_sql_database',
    description: 'Create a new Azure SQL Database with automatic SQL Server creation',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Database name' },
        serverName: { type: 'string', description: 'SQL Server name (must be globally unique)' },
        resourceGroupName: { type: 'string', description: 'Resource group name (will be created if it doesn\'t exist)' },
        location: { type: 'string', description: 'Azure region', default: 'eastus' },
        adminLogin: { type: 'string', description: 'SQL Server administrator login' },
        adminPassword: { type: 'string', description: 'SQL Server administrator password' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'serverName', 'resourceGroupName', 'adminLogin', 'adminPassword'],
    },
  },

  // Key Vault Tools
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

  // Virtual Network Tools
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
];