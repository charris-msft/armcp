# Azure Resource Management MCP Server

An AI-driven Azure cloud resource management server that implements the Model Context Protocol (MCP) for streamlined cloud operations.

## Quick Start

1. **Install the server:**
   ```bash
   git clone <repository-url>
   cd azure-resource-management-mcp
   npm install && npm run build
   ```

2. **Authenticate with Azure:**
   ```bash
   az login
   export AZURE_SUBSCRIPTION_ID="your-subscription-id"
   ```

3. **Add to VS Code:** Add this to your MCP settings:
   ```json
   {
     "mcp.servers": {
       "azure-resource-management": {
         "command": "node",
         "args": ["/path/to/azure-resource-management-mcp/dist/index.js"],
         "env": { "AZURE_SUBSCRIPTION_ID": "your-subscription-id" }
       }
     }
   }
   ```

4. **Start using:** "Create a resource group called 'my-project' in East US"

## Features

- **MCP Compliant**: Fully compatible with AI clients like GitHub Copilot and OpenAI agents
- **Smart Defaults**: Automatically configures resources with sensible defaults
- **Dependency Resolution**: Automatically creates prerequisite resources (e.g., resource groups, app service plans)
- **Secure Authentication**: Uses Azure DefaultAzureCredential for secure authentication
- **Resource Management**: Support for top Azure resources including:
  - Resource Groups
  - Storage Accounts 
  - App Service Web Apps
  - Virtual Machines
  - SQL Databases
  - Key Vaults
  - Container Instances
  - Virtual Networks
  - Cosmos DB
  - Redis Cache
  - Container Registries

## Prerequisites

- Node.js 18+ and npm
- Azure CLI installed and configured
- Azure subscription with appropriate permissions

## Installation

### Option 1: From Source (Recommended for Development)

1. Clone the repository:
```bash
git clone <repository-url>
cd azure-resource-management-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

### Option 2: Global Installation (Recommended for Production)

1. Install globally via npm:
```bash
npm install -g azure-resource-management-mcp
```

2. Or install locally and link:
```bash
git clone <repository-url>
cd azure-resource-management-mcp
npm install
npm run build
npm link
```

## Authentication

The server uses Azure DefaultAzureCredential, which supports multiple authentication methods:

1. **Environment Variables**: Set `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID`
2. **Azure CLI**: Run `az login` to authenticate
3. **Managed Identity**: Automatically used when running on Azure
4. **Visual Studio Code**: Uses the Azure Account extension

Set your default subscription:
```bash
export AZURE_SUBSCRIPTION_ID="your-subscription-id"
```

## MCP Client Configuration

### VS Code Setup

1. Install the MCP extension in VS Code
2. Open VS Code settings (Ctrl+, or Cmd+,)
3. Search for "MCP" and find "MCP: Servers"
4. Click "Edit in settings.json"
5. Add the server configuration:

**For Local Development:**
```json
{
  "mcp.servers": {
    "azure-resource-management": {
      "command": "node",
      "args": ["/path/to/azure-resource-management-mcp/dist/index.js"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id-here"
      }
    }
  }
}
```

**For Global Installation:**
```json
{
  "mcp.servers": {
    "azure-resource-management": {
      "command": "azure-resource-management-mcp",
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id-here"
      }
    }
  }
}
```

**Alternative using npm start:**
```json
{
  "mcp.servers": {
    "azure-resource-management": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/path/to/azure-resource-management-mcp",
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id-here"
      }
    }
  }
}
```

6. Restart VS Code to load the MCP server

### Claude Desktop Setup

Add to your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "azure-resource-management": {
      "command": "node",
      "args": ["/path/to/azure-resource-management-mcp/dist/index.js"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id-here"
      }
    }
  }
}
```

### Other MCP Clients

For any MCP-compatible client, use:
- **Command:** `node`
- **Args:** `["/path/to/azure-resource-management-mcp/dist/index.js"]`
- **Transport:** stdio
- **Environment:** Set `AZURE_SUBSCRIPTION_ID`

## Usage

### Running the Server Standalone

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

### Verify Installation

After configuring your MCP client, you should see:
- 15+ Azure tools available in your client
- MCP server status showing "connected"
- Ability to use commands like "Create a resource group called 'test'"

### Available Tools (15+ Tools)

#### Resource Groups
- `azure_create_resource_group`: Create a new resource group
- `azure_get_resource_group`: Get resource group details
- `azure_list_resource_groups`: List all resource groups
- `azure_delete_resource_group`: Delete a resource group

#### Storage Accounts
- `azure_create_storage_account`: Create a storage account with automatic resource group creation

#### Web Apps
- `azure_create_web_app`: Create a web app with automatic app service plan and resource group creation

#### Virtual Machines
- `azure_create_virtual_machine`: Create a VM with automatic networking setup

#### SQL Databases
- `azure_create_sql_database`: Create a SQL database with automatic server creation

#### Key Vaults
- `azure_create_key_vault`: Create a secure Key Vault

#### Container Services
- `azure_create_container_instance`: Create a container instance
- `azure_create_container_registry`: Create a container registry

#### Networking
- `azure_create_virtual_network`: Create a virtual network

#### Databases & Caching
- `azure_create_cosmos_db`: Create a Cosmos DB account
- `azure_create_redis_cache`: Create a Redis cache

### Example Usage

```typescript
// Create a resource group
{
  "name": "azure_create_resource_group",
  "arguments": {
    "name": "my-resource-group",
    "location": "eastus"
  }
}

// Create a web app (automatically creates resource group if needed)
{
  "name": "azure_create_web_app",
  "arguments": {
    "name": "my-web-app",
    "resourceGroupName": "my-resource-group",
    "runtime": "node",
    "tier": "Free"
  }
}

// Create a virtual machine with automatic networking
{
  "name": "azure_create_virtual_machine",
  "arguments": {
    "name": "my-vm",
    "resourceGroupName": "my-resource-group",
    "adminUsername": "azureuser",
    "sshPublicKey": "ssh-rsa AAAA...",
    "operatingSystem": "Linux"
  }
}

// Create a SQL database with automatic server setup
{
  "name": "azure_create_sql_database",
  "arguments": {
    "name": "my-database",
    "serverName": "my-sql-server",
    "resourceGroupName": "my-resource-group",
    "adminLogin": "sqladmin",
    "adminPassword": "SecurePassword123!"
  }
}
```

## Configuration

### Environment Variables

- `AZURE_SUBSCRIPTION_ID`: Default Azure subscription ID
- `AZURE_DEFAULT_LOCATION`: Default Azure region (defaults to "eastus")
- `AZURE_ENVIRONMENT`: Environment tag for resources (defaults to "development")

### Resource Naming

The server includes smart defaults for resource naming:
- Storage accounts: Must be 3-24 characters, lowercase letters and numbers only
- Web apps: Must be 1-60 characters, letters, numbers, and hyphens
- Resource groups: Must be 1-90 characters, various characters allowed

## Troubleshooting

### Common Issues

**MCP Server Not Connecting:**
1. Ensure the path to `dist/index.js` is correct
2. Verify Node.js 18+ is installed: `node --version`
3. Check that the project is built: `npm run build`
4. Verify Azure authentication: `az account show`

**Azure Authentication Errors:**
1. Run `az login` to authenticate with Azure CLI
2. Set subscription: `az account set --subscription "your-subscription-id"`
3. Verify permissions: Ensure you have Contributor access to the subscription
4. Check environment variables: `echo $AZURE_SUBSCRIPTION_ID`

**Tools Not Appearing:**
1. Restart your MCP client (VS Code, Claude Desktop, etc.)
2. Check MCP client logs for connection errors
3. Test server manually: `npm start` (should show "Azure Resource Management MCP server running on stdio")
4. Verify JSON configuration syntax in your MCP client settings

**Build Errors:**
1. Delete `node_modules` and `dist` folders
2. Run `npm install` and `npm run build`
3. Check TypeScript version: `npx tsc --version`

**Permission Errors:**
1. Ensure you have the required Azure RBAC permissions:
   - Contributor role on the subscription or resource groups
   - Key Vault Administrator for Key Vault operations
   - Storage Account Contributor for storage operations

### Getting Help

1. Check the Azure CLI configuration: `az account show`
2. Verify subscription access: `az group list`
3. Test with a simple operation first: Create a resource group
4. Check Azure portal for any service limitations or quotas

## Development

### Scripts

- `npm run build`: Build the TypeScript project
- `npm run dev`: Run in development mode with hot reload
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript type checking

### Project Structure

```
src/
├── index.ts                 # Main MCP server entry point
├── tools.ts                # Tool definitions
└── azure/
    ├── auth.ts             # Azure authentication
    ├── resource-manager.ts  # Core resource management
    └── smart-defaults.ts    # Smart defaults and validation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details