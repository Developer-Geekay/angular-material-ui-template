import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { environment } from '../../environments/environment';
import { DbMigrationService } from './db-migration.service';
export interface CollectionItem {
  id?: string;
  [key: string]: any;
}

class DbModel {
  constructor(
    public table: Table<CollectionItem>,
    private tablesMap: { [key: string]: Table<CollectionItem> }
  ) { }
  async find(id: number | string): Promise<CollectionItem | undefined> {
    return this.table.get(id);
  }

  async findAll(where?: { [key: string]: any }): Promise<CollectionItem[]> {
    if (!where) return this.table.toArray();
    const all = await this.table.toArray();
    return all.filter((item) =>
      Object.entries(where).every(([key, val]) => item[key] === val)
    );
  }

  async create(data: CollectionItem): Promise<number> {
    return this.table.add(data);
  }

  async modify(id: number, data: CollectionItem): Promise<number> {
    return this.table.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.table.delete(id);
  }


  async join(
    otherTableName: string,
    options: {
      foreignKey: string;
      primaryKey: string;
      type?: 'left' | 'inner' | 'full';
      where?: { [key: string]: any };
    }
  ): Promise<CollectionItem[]> {
    const mainRecords = await this.findAll(options.where);
    const joinType = options.type ?? 'left';

    try {
      const otherTable = this.tablesMap[otherTableName];
      if (!otherTable) throw new Error(`Table "${otherTableName}" not found`);

      const otherRecords = await otherTable.toArray();
      const result: CollectionItem[] = [];

      if (joinType === 'left' || joinType === 'inner') {
        for (const record of mainRecords) {
          const match = otherRecords.find(
            (other:any) => other[options.primaryKey] === record[options.foreignKey]
          );
          if (joinType === 'inner' && !match) continue;
          result.push({ ...record, [otherTableName]: match ?? null });
        }
      } else if (joinType === 'full') {
        const matchedMainKeys = new Set();
        for (const record of mainRecords) {
          const match = otherRecords.find(
            (other:any) => other[options.primaryKey] === record[options.foreignKey]
          );
          if (match) matchedMainKeys.add(match[options.primaryKey]);
          result.push({ ...record, [otherTableName]: match ?? null });
        }
        for (const other of otherRecords) {
          if (!matchedMainKeys.has(other[options.primaryKey])) {
            result.push({ [options.foreignKey]: null, [otherTableName]: other });
          }
        }
      }

      return result;
    } catch {
      return [];
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class DbServiceService extends Dexie {
  tablesMap: { [key: string]: Table<CollectionItem> } = {};
  collectionsNames: string[] = [];
  migrationService: DbMigrationService = inject(DbMigrationService);

  constructor() {
    const config = inject(DbMigrationService).getSchema();
    super(config.db);

    const schema: { [tableName: string]: string } = {};
    config.tables.forEach(({ tableName, primaryKey, fields }) => {
      const indexStr = fields?.join(',') ?? '';
      schema[tableName] = indexStr ? `${primaryKey},${indexStr}` : primaryKey;
    });

    this.version(5).stores(schema);

    for (const tableName of Object.keys(schema)) {
      this.tablesMap[tableName] = this.table(tableName);
    }

    this.collectionsNames = Object.keys(schema);
    this.initializeAllTables();
  }

  async initializeAllTables(): Promise<void> {
    try {
      for (const name of this.collectionsNames) {
        await this.tablesMap[name].count();
      }
    } catch (error) {
      console.error('Error during table initialization:', error);
    }
  }

  async backupData(): Promise<void> {
    try {
      const exportData: Record<string, any[]> = {};
      for (const name of this.collectionsNames) {
        exportData[name] = await this.tablesMap[name].toArray();
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expenses-backup-${new Date().toISOString()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Backup failed:', err);
    }
  }

  async restoreData(data: Record<string, any[]>): Promise<void> {
    try {
      for (const name of this.collectionsNames) {
        if (data[name]) {
          await this.tablesMap[name].clear(); // optional: reset table
          await this.tablesMap[name].bulkAdd(data[name]);
        }
      }
    } catch (err) {
      console.error('Restore failed:', err);
    }
  }

  async clearDatabase(): Promise<void> {
    try {
      for (const name of this.collectionsNames) {
        await this.tablesMap[name].clear();
      }
    } catch (err) {
      console.error('Failed to clear database:', err);
    }
  }

  async resetDatabase(): Promise<void> {
    try {
      await this.clearDatabase();
      await this.initializeAllTables();
    } catch (err) {
      console.error('Failed to reset database:', err);
    }
  }

  getModel(tableName: string): DbModel {
    const table = this.tablesMap[tableName];
    if (!table) {
      throw new Error(`Table "${tableName}" not found in database.`);
    }
    return new DbModel(table, this.tablesMap);
  }
}
