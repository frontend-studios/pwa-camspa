import type { CategoryTreeItem } from '@plentymarkets/shop-api';

import type { UseCategoryTreeState, UseCategoryTreeMethodsReturn, GetCategoryTree, SetCategoryTree } from './types';

/**
 * @description Composable for managing the category tree.
 * @returns UseCategoryTreeMethodsReturn
 * @example
 * ``` ts
 * const { data, loading, getCategoryTree } = useCategoryTree();
 * ```
 */
export const useCategoryTree: UseCategoryTreeMethodsReturn = () => {
  const state = useState<UseCategoryTreeState>('useCategoryTree', () => ({
    data: [] as CategoryTreeItem[],
    loading: false,
  }));

  /**
   * @description Function for fetching the category tree.
   * @example
   * ``` ts
   * getCategoryTree();
   * ```
   */
  const getCategoryTree: GetCategoryTree = async () => {
    state.value.loading = true;
    try {
      const rawData = await useSdk().plentysystems.getCategoryTree();
      const data = rawData?.data[0].children ?? [];
      state.value.data = data ?? state.value.data;
      return state.value.data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  const setCategoryTree: SetCategoryTree = (data: CategoryTreeItem[]) => {
    state.value.data = data[0].children ?? [];
  };

  // const setCategoryTree: SetCategoryTree = (data: CategoryTreeItem[]) => {
  //   state.value.data = data;
  // };

  /**
   * @description Function for setting the category tree data.
   * @example
   * ``` ts
   * setCategoryTree();
   * ```
   */

  return {
    getCategoryTree,
    setCategoryTree,
    ...toRefs(state.value),
  };
};
