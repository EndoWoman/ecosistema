import { auth } from '@/core/auth/server';
import { createOperationsStore } from './store';
// Initialize the identity schema before attaching operational foreign keys.
void auth;
const globalOps=globalThis as unknown as {endoOperations?:ReturnType<typeof createOperationsStore>};
export const operations=globalOps.endoOperations??=createOperationsStore();
