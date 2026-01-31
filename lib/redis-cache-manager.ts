import { Redis } from 'ioredis';
import { logger } from './logger';
import { CacheManager } from './cache-manager';

const CACHE_DURATION = 6 * 60 * 60; // 6 hours in seconds

export class RedisCacheManager {
  private static redis: Redis | null = null;
  private static isRedisAvailable = false;
  private static redisCheckDone = false;

  private static async getClient() {
    if (this.redisCheckDone && !this.isRedisAvailable) {
      return null; // Redis not available, use file cache
    }

    if (!this.redis && !this.redisCheckDone) {
      const redisUrl = process.env.REDIS_URL;
      
      if (!redisUrl) {
        logger.info('Redis not configured, using file-based cache', { prefix: 'Cache' });
        this.isRedisAvailable = false;
        this.redisCheckDone = true;
        return null;
      }

      try {
        this.redis = new Redis(redisUrl);

        this.redis.on('connect', () => {
          logger.info('Redis connected successfully', { prefix: 'Cache' });
          this.isRedisAvailable = true;
        });

        this.redis.on('error', (error) => {
          logger.warn(`Redis error, falling back to file cache: ${error.message}`, { prefix: 'Cache' });
          this.isRedisAvailable = false;
        });

        // Test connection
        await this.redis.ping();
        this.isRedisAvailable = true;
      } catch (error) {
        logger.warn(`Redis connection failed, using file-based cache: ${error}`, { prefix: 'Cache' });
        this.isRedisAvailable = false;
        this.redis = null;
      }
      
      this.redisCheckDone = true;
    }

    return this.redis;
  }

  private static getCacheKey(username: string, repo: string): string {
    return `repo_data:${username}:${repo}`;
  }

  static async hasCache(username: string, repo: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      if (!client) {
        // Fallback to file cache
        return CacheManager.isDocumentProcessed(`${username}/${repo}`);
      }
      const key = this.getCacheKey(username, repo);
      const exists = await client.exists(key);
      return exists === 1;
    } catch (error) {
      logger.error(`Cache check error: ${error}`, { prefix: 'Cache' });
      return CacheManager.isDocumentProcessed(`${username}/${repo}`);
    }
  }

  static async saveToCache(username: string, repo: string, data: any): Promise<void> {
    try {
      const client = await this.getClient();
      if (!client) {
        // Fallback to file cache
        CacheManager.saveToCache(username, repo, data);
        logger.info(`Cached data for ${username}/${repo} (file cache)`, { prefix: 'Cache' });
        return;
      }
      const key = this.getCacheKey(username, repo);
      await client.setex(key, CACHE_DURATION, JSON.stringify(data));
      logger.info(`Cached data for ${username}/${repo} (Redis)`, { prefix: 'Cache' });
    } catch (error) {
      logger.error(`Redis cache save error, using file cache: ${error}`, { prefix: 'Cache' });
      CacheManager.saveToCache(username, repo, data);
    }
  }

  static async getFromCache(username: string, repo: string): Promise<any> {
    try {
      const client = await this.getClient();
      if (!client) {
        // Fallback to file cache
        return CacheManager.getFromCache(username, repo);
      }
      const key = this.getCacheKey(username, repo);
      const data = await client.get(key);
      if (!data) return null;

      return JSON.parse(data);
    } catch (error) {
      logger.error(`Redis cache retrieval error, trying file cache: ${error}`, { prefix: 'Cache' });
      return CacheManager.getFromCache(username, repo);
    }
  }

  static async clearCache(username: string, repo: string): Promise<void> {
    try {
      const client = await this.getClient();
      if (!client) {
        // Fallback to file cache
        const cachePath = CacheManager.getCachePath(username, repo);
        const fs = require('fs');
        if (fs.existsSync(cachePath)) {
          fs.unlinkSync(cachePath);
          logger.info(`Cleared cache for ${username}/${repo} (file cache)`, { prefix: 'Cache' });
        }
        return;
      }
      const key = this.getCacheKey(username, repo);
      await client.del(key);
      logger.info(`Cleared cache for ${username}/${repo} (Redis)`, { prefix: 'Cache' });
    } catch (error) {
      logger.error(`Cache clear error: ${error}`, { prefix: 'Cache' });
    }
  }
}
