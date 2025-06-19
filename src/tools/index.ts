import { resourceGroupTools } from './resource-group-tools.js';
import { storageTools } from './storage-tools.js';
import { webAppTools } from './webapp-tools.js';
import { vmTools } from './vm-tools.js';
import { sqlTools } from './sql-tools.js';
import { keyVaultTools } from './keyvault-tools.js';
import { containerTools } from './container-tools.js';
import { networkTools } from './network-tools.js';
import { databaseTools } from './database-tools.js';

export const azureTools = [
  ...resourceGroupTools,
  ...storageTools,
  ...webAppTools,
  ...vmTools,
  ...sqlTools,
  ...keyVaultTools,
  ...containerTools,
  ...networkTools,
  ...databaseTools,
];

export * from './resource-group-tools.js';
export * from './storage-tools.js';
export * from './webapp-tools.js';
export * from './vm-tools.js';
export * from './sql-tools.js';
export * from './keyvault-tools.js';
export * from './container-tools.js';
export * from './network-tools.js';
export * from './database-tools.js';