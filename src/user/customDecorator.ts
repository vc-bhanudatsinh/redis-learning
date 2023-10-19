import { CacheKey } from '@nestjs/cache-manager';

export const CustomCacheKey = (keyParamName: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    return {
      ...descriptor,
      value: async function (...args: any[]) {
        const [dto] = args; // Extract the 'id' value from @Param()

        const cacheKeyString = `${keyParamName}:${dto[`${keyParamName}`]}`;
        // Set the cache key using @CacheKey
        CacheKey(cacheKeyString)(target, key, descriptor);

        return descriptor.value.apply(this, args);
      },
    };
  };
};
