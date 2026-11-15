/**
 * Minimal in-memory collection used by repositories.
 * Repositories depend on their own interfaces, so swapping this for a real
 * database (Postgres, Mongo…) only touches the repository implementation.
 */
export class MemoryCollection<T extends { id: string }> {
  private readonly items = new Map<string, T>();

  constructor(seed: readonly T[] = []) {
    seed.forEach((item) => this.items.set(item.id, item));
  }

  all(): T[] {
    return [...this.items.values()];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.all().find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.all().filter(predicate);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }

  save(item: T): T {
    this.items.set(item.id, item);
    return item;
  }
}
