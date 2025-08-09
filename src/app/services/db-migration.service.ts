// New file: db-migration.service.ts
import { Injectable, Type } from '@angular/core';

interface DbConfig {
  db: string;
  tables: TableDefinition[];
}

interface TableDefinition {
  tableName: string;
  primaryKey: string;
  indexes?: string[];
  fields?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DbMigrationService {
  SchemaMetadata = {
    settings: {
      fields: ['key', 'value']
    },
    categories: {
      fields: [
        'name',
        'type',
        'icon',
        'color',
        'isDefault'
      ]
    },
    subcategories: {
      fields: [
        'name',
        'categoryId',
        'icon'
      ]
    },
    currencies: {
      fields: [
        'code',
        'name',
        'symbol',
        'isDefault'
      ]
    },
    logs: {
      fields: [
        'type',
        'category',
        'subcategory',
        'notes',
        'date',
        'amount',
        'currency',
        'transactionType',
        'personName',
        'dueDate',
        'status',
        'createdAt',
        'updatedAt'
      ]
    },
    lending_records: {
      fields: [
        'type',
        'personName',
        'amount',
        'currency',
        'date',
        'dueDate',
        'notes',
        'status',
        'tenure',
        'repaymentDay',
        'repaymentAmount',
        'createdAt',
        'updatedAt'
      ]
    }
  };

  getSchema(): DbConfig {
    const tables: TableDefinition[] = Object.entries(this.SchemaMetadata).map(
      ([tableName, meta]) => ({
        tableName,
        primaryKey: '++id',
        fields: meta.fields
      })
    );
    return {
      db: 'expenses',
      tables,
    };
  }
}
