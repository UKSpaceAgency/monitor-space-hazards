import { useMutation } from '@tanstack/react-query';

import type { TypeUserUpdate } from '@/__generated__/data-contracts';
import { patchUsersMe } from '@/actions/patchUsersMe';

import { QUERY_KEYS } from './queryKeys';

export const usePatchUsersMe = () => useMutation({
  mutationKey: [QUERY_KEYS.PATCH_USERS_ME],
  mutationFn: (params: TypeUserUpdate) => patchUsersMe(params),
});
