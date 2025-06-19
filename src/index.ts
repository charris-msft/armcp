#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { AzureResourceManager } from './azure/resource-manager.js';
import { azureTools } from './tools/index.js';
import { z } from 'zod';

class AzureResourceManagementMCPServer {
  private server: Server;
  private azureManager: AzureResourceManager;

  constructor() {
    this.server = new Server(
      {
        name: 'azure-resource-management-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.azureManager = new AzureResourceManager();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: azureTools,
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Resource Group Tools
          case 'azure_create_resource_group':
            return await this.handleCreateResourceGroup(args);
          case 'azure_get_resource_group':
            return await this.handleGetResourceGroup(args);
          case 'azure_list_resource_groups':
            return await this.handleListResourceGroups(args);
          case 'azure_delete_resource_group':
            return await this.handleDeleteResourceGroup(args);

          // Storage Account Tools
          case 'azure_create_storage_account':
            return await this.handleCreateStorageAccount(args);

          // Web App Tools
          case 'azure_create_web_app':
            return await this.handleCreateWebApp(args);

          // Virtual Machine Tools
          case 'azure_create_virtual_machine':
            return await this.handleCreateVirtualMachine(args);

          // SQL Database Tools
          case 'azure_create_sql_database':
            return await this.handleCreateSqlDatabase(args);

          // Key Vault Tools
          case 'azure_create_key_vault':
            return await this.handleCreateKeyVault(args);

          // Container Instance Tools
          case 'azure_create_container_instance':
            return await this.handleCreateContainerInstance(args);

          // Virtual Network Tools
          case 'azure_create_virtual_network':
            return await this.handleCreateVirtualNetwork(args);

          // Cosmos DB Tools
          case 'azure_create_cosmos_db':
            return await this.handleCreateCosmosDb(args);

          // Redis Cache Tools
          case 'azure_create_redis_cache':
            return await this.handleCreateRedisCache(args);

          // Container Registry Tools
          case 'azure_create_container_registry':
            return await this.handleCreateContainerRegistry(args);

          // Storage Account CRUD
          case 'azure_get_storage_account':
            return await this.handleGetStorageAccount(args);
          case 'azure_list_storage_accounts':
            return await this.handleListStorageAccounts(args);
          case 'azure_delete_storage_account':
            return await this.handleDeleteStorageAccount(args);

          // Web App CRUD
          case 'azure_get_web_app':
            return await this.handleGetWebApp(args);
          case 'azure_list_web_apps':
            return await this.handleListWebApps(args);
          case 'azure_start_web_app':
            return await this.handleStartWebApp(args);
          case 'azure_stop_web_app':
            return await this.handleStopWebApp(args);
          case 'azure_restart_web_app':
            return await this.handleRestartWebApp(args);
          case 'azure_delete_web_app':
            return await this.handleDeleteWebApp(args);

          // Virtual Machine CRUD
          case 'azure_get_virtual_machine':
            return await this.handleGetVirtualMachine(args);
          case 'azure_list_virtual_machines':
            return await this.handleListVirtualMachines(args);
          case 'azure_start_virtual_machine':
            return await this.handleStartVirtualMachine(args);
          case 'azure_stop_virtual_machine':
            return await this.handleStopVirtualMachine(args);
          case 'azure_restart_virtual_machine':
            return await this.handleRestartVirtualMachine(args);
          case 'azure_delete_virtual_machine':
            return await this.handleDeleteVirtualMachine(args);

          // SQL Database CRUD
          case 'azure_get_sql_database':
            return await this.handleGetSqlDatabase(args);
          case 'azure_list_sql_databases':
            return await this.handleListSqlDatabases(args);
          case 'azure_delete_sql_database':
            return await this.handleDeleteSqlDatabase(args);

          // Key Vault CRUD
          case 'azure_get_key_vault':
            return await this.handleGetKeyVault(args);
          case 'azure_list_key_vaults':
            return await this.handleListKeyVaults(args);
          case 'azure_delete_key_vault':
            return await this.handleDeleteKeyVault(args);

          // Container Instance CRUD
          case 'azure_get_container_instance':
            return await this.handleGetContainerInstance(args);
          case 'azure_list_container_instances':
            return await this.handleListContainerInstances(args);
          case 'azure_delete_container_instance':
            return await this.handleDeleteContainerInstance(args);

          // Virtual Network CRUD
          case 'azure_get_virtual_network':
            return await this.handleGetVirtualNetwork(args);
          case 'azure_list_virtual_networks':
            return await this.handleListVirtualNetworks(args);
          case 'azure_delete_virtual_network':
            return await this.handleDeleteVirtualNetwork(args);

          // Cosmos DB CRUD
          case 'azure_get_cosmos_db':
            return await this.handleGetCosmosDb(args);
          case 'azure_list_cosmos_db':
            return await this.handleListCosmosDb(args);
          case 'azure_delete_cosmos_db':
            return await this.handleDeleteCosmosDb(args);

          // Redis Cache CRUD
          case 'azure_get_redis_cache':
            return await this.handleGetRedisCache(args);
          case 'azure_list_redis_cache':
            return await this.handleListRedisCache(args);
          case 'azure_delete_redis_cache':
            return await this.handleDeleteRedisCache(args);

          // Container Registry CRUD
          case 'azure_get_container_registry':
            return await this.handleGetContainerRegistry(args);
          case 'azure_list_container_registries':
            return await this.handleListContainerRegistries(args);
          case 'azure_delete_container_registry':
            return await this.handleDeleteContainerRegistry(args);

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  // Resource Group Handlers
  private async handleCreateResourceGroup(args: any) {
    const schema = z.object({
      name: z.string(),
      location: z.string().default('eastus'),
      subscriptionId: z.string().optional(),
      tags: z.record(z.string()).optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createResourceGroup(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created resource group '${parsed.name}' in location '${parsed.location}'`,
        },
      ],
    };
  }

  private async handleGetResourceGroup(args: any) {
    const schema = z.object({
      name: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getResourceGroup(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Resource Group Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListResourceGroups(args: any) {
    const schema = z.object({
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listResourceGroups(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Resource Groups:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteResourceGroup(args: any) {
    const schema = z.object({
      name: z.string(),
      subscriptionId: z.string().optional(),
      force: z.boolean().default(false),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteResourceGroup(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted resource group '${parsed.name}'`,
        },
      ],
    };
  }

  // Storage Account Handlers
  private async handleCreateStorageAccount(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      sku: z.enum(['Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Premium_LRS']).default('Standard_LRS'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createStorageAccount(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created storage account '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Web App Handlers
  private async handleCreateWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      runtime: z.enum(['node', 'dotnet', 'python', 'java', 'php']).default('node'),
      tier: z.enum(['Free', 'Basic', 'Standard', 'Premium']).default('Free'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created web app '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Virtual Machine Handlers
  private async handleCreateVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      size: z.string().default('Standard_B2s'),
      adminUsername: z.string(),
      adminPassword: z.string().optional(),
      sshPublicKey: z.string().optional(),
      operatingSystem: z.enum(['Windows', 'Linux']).default('Linux'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created virtual machine '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // SQL Database Handlers
  private async handleCreateSqlDatabase(args: any) {
    const schema = z.object({
      name: z.string(),
      serverName: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      adminLogin: z.string(),
      adminPassword: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createSqlDatabase(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created SQL database '${parsed.name}' on server '${parsed.serverName}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Key Vault Handlers
  private async handleCreateKeyVault(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createKeyVault(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created Key Vault '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Container Instance Handlers
  private async handleCreateContainerInstance(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      image: z.string().default('nginx:latest'),
      cpu: z.number().default(1),
      memory: z.number().default(1.5),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createContainerInstance(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created container instance '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Virtual Network Handlers
  private async handleCreateVirtualNetwork(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      addressSpace: z.string().default('10.0.0.0/16'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createVirtualNetwork(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created virtual network '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Cosmos DB Handlers
  private async handleCreateCosmosDb(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      apiType: z.enum(['Sql', 'MongoDB', 'Cassandra', 'Table', 'Gremlin']).default('Sql'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createCosmosDb(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created Cosmos DB account '${parsed.name}' with ${parsed.apiType} API in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Redis Cache Handlers
  private async handleCreateRedisCache(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      sku: z.enum(['Basic', 'Standard', 'Premium']).default('Basic'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createRedisCache(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created Redis cache '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Container Registry Handlers
  private async handleCreateContainerRegistry(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      location: z.string().default('eastus'),
      sku: z.enum(['Basic', 'Standard', 'Premium']).default('Basic'),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.createContainerRegistry(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully created container registry '${parsed.name}' in resource group '${parsed.resourceGroupName}'`,
        },
      ],
    };
  }

  // Storage Account CRUD Handlers
  private async handleGetStorageAccount(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getStorageAccount(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Storage Account Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListStorageAccounts(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listStorageAccounts(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Storage Accounts:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteStorageAccount(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteStorageAccount(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted storage account '${parsed.name}'`,
        },
      ],
    };
  }

  // Web App CRUD Handlers
  private async handleGetWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Web App Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListWebApps(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listWebApps(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Web Apps:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleStartWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.startWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully started web app '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleStopWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.stopWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully stopped web app '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleRestartWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.restartWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully restarted web app '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleDeleteWebApp(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteWebApp(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted web app '${parsed.name}'`,
        },
      ],
    };
  }

  // Virtual Machine CRUD Handlers
  private async handleGetVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Virtual Machine Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListVirtualMachines(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listVirtualMachines(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Virtual Machines:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleStartVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.startVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully started virtual machine '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleStopVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      deallocate: z.boolean().default(true),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.stopVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully stopped virtual machine '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleRestartVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.restartVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully restarted virtual machine '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleDeleteVirtualMachine(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      deleteDisks: z.boolean().default(true),
      deleteNetworkInterfaces: z.boolean().default(true),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteVirtualMachine(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted virtual machine '${parsed.name}'`,
        },
      ],
    };
  }

  // SQL Database CRUD Handlers
  private async handleGetSqlDatabase(args: any) {
    const schema = z.object({
      name: z.string(),
      serverName: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getSqlDatabase(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `SQL Database Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListSqlDatabases(args: any) {
    const schema = z.object({
      serverName: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listSqlDatabases(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `SQL Databases:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteSqlDatabase(args: any) {
    const schema = z.object({
      name: z.string(),
      serverName: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteSqlDatabase(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted SQL database '${parsed.name}'`,
        },
      ],
    };
  }

  // Key Vault CRUD Handlers
  private async handleGetKeyVault(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getKeyVault(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Key Vault Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListKeyVaults(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listKeyVaults(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Key Vaults:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteKeyVault(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteKeyVault(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted Key Vault '${parsed.name}'`,
        },
      ],
    };
  }

  // Additional CRUD Handlers
  private async handleGetContainerInstance(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getContainerInstance(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Container Instance Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListContainerInstances(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listContainerInstances(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Container Instances:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }


  private async handleDeleteContainerInstance(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteContainerInstance(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted container instance '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleGetVirtualNetwork(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getVirtualNetwork(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Virtual Network Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListVirtualNetworks(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listVirtualNetworks(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Virtual Networks:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteVirtualNetwork(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteVirtualNetwork(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted virtual network '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleGetCosmosDb(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getCosmosDb(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Cosmos DB Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListCosmosDb(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listCosmosDb(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Cosmos DB Accounts:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteCosmosDb(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteCosmosDb(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted Cosmos DB account '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleGetRedisCache(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getRedisCache(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Redis Cache Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListRedisCache(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listRedisCache(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Redis Caches:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteRedisCache(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteRedisCache(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted Redis cache '${parsed.name}'`,
        },
      ],
    };
  }

  private async handleGetContainerRegistry(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.getContainerRegistry(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Container Registry Details:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleListContainerRegistries(args: any) {
    const schema = z.object({
      resourceGroupName: z.string().optional(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    const result = await this.azureManager.listContainerRegistries(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Container Registries:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }

  private async handleDeleteContainerRegistry(args: any) {
    const schema = z.object({
      name: z.string(),
      resourceGroupName: z.string(),
      subscriptionId: z.string().optional(),
    });

    const parsed = schema.parse(args);
    await this.azureManager.deleteContainerRegistry(parsed);
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully deleted container registry '${parsed.name}'`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Azure Resource Management MCP server running on stdio');
  }
}

const server = new AzureResourceManagementMCPServer();
server.run().catch(console.error);