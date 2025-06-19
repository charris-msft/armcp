export const vmTools = [
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
  {
    name: 'azure_get_virtual_machine',
    description: 'Get details of an Azure Virtual Machine',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_list_virtual_machines',
    description: 'List Azure Virtual Machines in a resource group or subscription',
    inputSchema: {
      type: 'object',
      properties: {
        resourceGroupName: { type: 'string', description: 'Resource group name (optional, lists all if not provided)' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
    },
  },
  {
    name: 'azure_start_virtual_machine',
    description: 'Start an Azure Virtual Machine',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_stop_virtual_machine',
    description: 'Stop an Azure Virtual Machine',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        deallocate: { type: 'boolean', description: 'Deallocate VM to stop billing', default: true },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_restart_virtual_machine',
    description: 'Restart an Azure Virtual Machine',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
  {
    name: 'azure_delete_virtual_machine',
    description: 'Delete an Azure Virtual Machine',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Virtual machine name' },
        resourceGroupName: { type: 'string', description: 'Resource group name' },
        deleteDisks: { type: 'boolean', description: 'Delete associated disks', default: true },
        deleteNetworkInterfaces: { type: 'boolean', description: 'Delete associated network interfaces', default: true },
        subscriptionId: { type: 'string', description: 'Azure subscription ID (optional)' },
      },
      required: ['name', 'resourceGroupName'],
    },
  },
];