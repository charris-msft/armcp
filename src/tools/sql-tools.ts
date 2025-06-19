export const sqlTools = [
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
  {
    name: 'azure_get_sql_database',
    description: 'Get details of an Azure SQL Database',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Database name' },
        serverName: { type: 'string', description: 'SQL Server name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'serverName', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_sql_databases',
    description: 'List Azure SQL Databases on a server',
    inputSchema: {
      type: 'object',
      properties: {
        serverName: { type: 'string', description: 'SQL Server name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['serverName', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_delete_sql_database',
    description: 'Delete an Azure SQL Database',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Database name' },
        serverName: { type: 'string', description: 'SQL Server name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'serverName', 'resourceGroupName'],
    },
  },
];