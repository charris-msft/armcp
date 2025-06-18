export class SmartDefaults {
  getDefaultTags(): Record<string, string> {
    const now = new Date();
    return {
      'Created-By': 'Azure-Resource-Management-MCP',
      'Created-Date': now.toISOString().split('T')[0],
      'Environment': process.env.AZURE_ENVIRONMENT || 'development',
    };
  }

  getAppServicePlanSku(tier: string): string {
    const skuMap: Record<string, string> = {
      'Free': 'F1',
      'Basic': 'B1',
      'Standard': 'S1',
      'Premium': 'P1v2',
    };

    return skuMap[tier] || 'F1';
  }

  getWebAppConfig(runtime: string): any {
    const runtimeConfigs: Record<string, any> = {
      'node': {
        nodeVersion: '~18',
        appSettings: [
          {
            name: 'WEBSITE_NODE_DEFAULT_VERSION',
            value: '~18',
          },
        ],
      },
      'dotnet': {
        netFrameworkVersion: 'v6.0',
        appSettings: [],
      },
      'python': {
        pythonVersion: '3.9',
        appSettings: [
          {
            name: 'PYTHON_VERSION',
            value: '3.9',
          },
        ],
      },
      'java': {
        javaVersion: '11',
        javaContainer: 'TOMCAT',
        javaContainerVersion: '9.0',
        appSettings: [],
      },
      'php': {
        phpVersion: '8.1',
        appSettings: [],
      },
    };

    return runtimeConfigs[runtime] || runtimeConfigs['node'];
  }

  generateUniqueResourceName(baseName: string, resourceType: string): string {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 8);
    
    let prefix = '';
    switch (resourceType) {
      case 'storage':
        prefix = 'st';
        break;
      case 'webapp':
        prefix = 'app';
        break;
      case 'vm':
        prefix = 'vm';
        break;
      default:
        prefix = 'res';
    }

    const cleanBaseName = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${prefix}${cleanBaseName}${timestamp}${randomStr}`.substring(0, 24);
  }

  getRecommendedLocation(): string {
    return process.env.AZURE_DEFAULT_LOCATION || 'eastus';
  }

  getDefaultStorageSku(): string {
    return 'Standard_LRS';
  }


  getVmStorageProfile(operatingSystem: 'Windows' | 'Linux'): any {
    const isWindows = operatingSystem === 'Windows';
    return {
      imageReference: {
        publisher: isWindows ? 'MicrosoftWindowsServer' : 'Canonical',
        offer: isWindows ? 'WindowsServer' : '0001-com-ubuntu-server-focal',
        sku: isWindows ? '2022-datacenter-core' : '20_04-lts-gen2',
        version: 'latest',
      },
      osDisk: {
        name: 'osdisk',
        caching: 'ReadWrite',
        createOption: 'FromImage',
        managedDisk: {
          storageAccountType: 'Premium_LRS',
        },
      },
    };
  }

  getVmOsProfile(
    vmName: string,
    adminUsername: string,
    adminPassword?: string,
    sshPublicKey?: string,
    operatingSystem: 'Windows' | 'Linux' = 'Linux'
  ): any {
    const baseProfile = {
      computerName: vmName,
      adminUsername,
    };

    if (operatingSystem === 'Windows') {
      return {
        ...baseProfile,
        adminPassword,
        windowsConfiguration: {
          enableAutomaticUpdates: true,
          provisionVMAgent: true,
        },
      };
    } else {
      const profile: any = {
        ...baseProfile,
        linuxConfiguration: {
          disablePasswordAuthentication: !!sshPublicKey,
        },
      };

      if (sshPublicKey) {
        profile.linuxConfiguration.ssh = {
          publicKeys: [
            {
              path: `/home/${adminUsername}/.ssh/authorized_keys`,
              keyData: sshPublicKey,
            },
          ],
        };
      } else if (adminPassword) {
        profile.adminPassword = adminPassword;
        profile.linuxConfiguration.disablePasswordAuthentication = false;
      }

      return profile;
    }
  }

  getCosmosDbCapabilities(apiType: string): any[] {
    const capabilityMap: Record<string, any[]> = {
      'Sql': [],
      'MongoDB': [{ name: 'EnableMongo' }],
      'Cassandra': [{ name: 'EnableCassandra' }],
      'Table': [{ name: 'EnableTable' }],
      'Gremlin': [{ name: 'EnableGremlin' }],
    };

    return capabilityMap[apiType] || [];
  }

  getDefaultVmSize(): string {
    return 'Standard_B2s';
  }

  getDefaultContainerResources(): { cpu: number; memory: number } {
    return {
      cpu: 1,
      memory: 1.5,
    };
  }

  validateResourceName(name: string, resourceType: string): { valid: boolean; message?: string } {
    switch (resourceType) {
      case 'storage':
        if (!/^[a-z0-9]{3,24}$/.test(name)) {
          return {
            valid: false,
            message: 'Storage account name must be 3-24 characters long and contain only lowercase letters and numbers',
          };
        }
        break;
      case 'webapp':
        if (!/^[a-zA-Z0-9-]{1,60}$/.test(name) || name.startsWith('-') || name.endsWith('-')) {
          return {
            valid: false,
            message: 'Web app name must be 1-60 characters long, contain only letters, numbers, and hyphens, and cannot start or end with a hyphen',
          };
        }
        break;
      case 'resourcegroup':
        if (!/^[\w\-\.\(\)]{1,90}$/.test(name) || name.endsWith('.')) {
          return {
            valid: false,
            message: 'Resource group name must be 1-90 characters long and cannot end with a period',
          };
        }
        break;
      case 'keyvault':
        if (!/^[a-zA-Z0-9-]{3,24}$/.test(name) || name.startsWith('-') || name.endsWith('-')) {
          return {
            valid: false,
            message: 'Key Vault name must be 3-24 characters long, contain only letters, numbers, and hyphens, and cannot start or end with a hyphen',
          };
        }
        break;
      case 'vm':
        if (!/^[a-zA-Z0-9-]{1,64}$/.test(name) || name.startsWith('-') || name.endsWith('-')) {
          return {
            valid: false,
            message: 'VM name must be 1-64 characters long, contain only letters, numbers, and hyphens, and cannot start or end with a hyphen',
          };
        }
        break;
      case 'cosmosdb':
        if (!/^[a-z0-9-]{3,44}$/.test(name) || name.startsWith('-') || name.endsWith('-')) {
          return {
            valid: false,
            message: 'Cosmos DB account name must be 3-44 characters long, contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen',
          };
        }
        break;
      case 'containerregistry':
        if (!/^[a-zA-Z0-9]{5,50}$/.test(name)) {
          return {
            valid: false,
            message: 'Container Registry name must be 5-50 characters long and contain only letters and numbers',
          };
        }
        break;
    }

    return { valid: true };
  }
}