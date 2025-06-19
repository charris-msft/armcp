export const webAppTools = [
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
  {
    name: 'azure_get_web_app',
    description: 'Get details of an Azure Web App',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_web_apps',
    description: 'List Azure Web Apps in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_start_web_app',
    description: 'Start an Azure Web App',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_stop_web_app',
    description: 'Stop an Azure Web App',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_restart_web_app',
    description: 'Restart an Azure Web App',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_delete_web_app',
    description: 'Delete an Azure Web App',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Web app name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];