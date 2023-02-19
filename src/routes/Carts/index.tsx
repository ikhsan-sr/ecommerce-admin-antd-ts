import useTableData from '@/hooks/useTableData';
import { API_URL } from '@/constants/env';
import { COLUMN_LIST } from './columns';

const Products = () => {
  const { tableComponent } = useTableData(`${API_URL}/carts`, {
    responseKey: 'carts',
    tableProps: { columns: COLUMN_LIST },
  });

  return tableComponent;
}

export default Products