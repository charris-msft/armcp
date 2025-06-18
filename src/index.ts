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
import { azureTools } from './tools.js';
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

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Azure Resource Management MCP server running on stdio');
  }
}

const server = new AzureResourceManagementMCPServer();
server.run().catch(console.error);