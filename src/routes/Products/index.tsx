import { Input } from 'antd';

import useTableData from '@/hooks/useTableData';
import { API_URL } from '@/constants/env';
import { COLUMN } from './consts';

import { cssProductsPage } from './styles';

const { Search } = Input;

const Products = () => {
  const { tableComponent, refetch } = useTableData(`${API_URL}/products`, {
    responseKey: 'products',
    tableProps: { columns: COLUMN },
  });

  const handleSearch = (value: string) => (
    refetch(`${API_URL}/products/search?q=${value}`)
  );

  return (
    <div css={cssProductsPage}>
      <div className="search-wrapper">
        <Search
          placeholder="Search product"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </div>

      {tableComponent}
    </div>
  )
}

export default Products