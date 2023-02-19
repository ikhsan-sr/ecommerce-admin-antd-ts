import { useMemo, useState } from 'react';

import { Card, Col, Row, TableProps, Typography } from 'antd';

// import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { FetcherFuncType, UseFetchOption } from '@/hooks/useFetch/interface';
import useFetch from '@/hooks/useFetch';

interface UseTableOptions<DT> extends UseFetchOption {
  searchKey: string;
  tableProps: TableProps<DT>;
  extraHeader?: JSX.Element | boolean;
  customHeader?: (searchComponent: JSX.Element, refetch: FetcherFuncType<any>, data: any) => JSX.Element;
  noHeader?: boolean;
  noPage?: boolean;
  listDataGetter?: (data: any) => any[];
  responseKey?: string;
}

function useTableData<DT extends object>(url: string, options: UseTableOptions<DT>) {
  const {
    tableProps,
    // searchKey,
    extraHeader,
    listDataGetter: _1,
    customHeader = () => null,
    noHeader,
    noPage,
    responseKey,
    ...restOption
  } = options;

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  // const [searchkey, setSearchkey] = useState<any>({});

  const { data, loading, refetch, refetched } = useFetch<any>(url, {
    ...restOption,
    variables: {
      ...restOption.variables,
      // ...searchkey,
    },
    useCache: false,
    ssr: false,
  });
  const listDataGetter = useMemo(() => options?.listDataGetter, [options]);
  const defaultData = (data?.[responseKey] || []) as any[];
  // console.log('xx', data)
  const result = typeof listDataGetter === 'function' ? listDataGetter(data?.[responseKey] || []) : defaultData;

  const count = data?.total;
  const searchComponent = (
    null
    // <SearchBar
    //   onChange={(ev) => !ev.currentTarget.value && setSearchkey({})}
    //   onSearch={(search) =>
    //     setSearchkey({
    //       ...(search && {
    //         [searchKey]: { $contL: encodeURIComponent(`%${search}%`) },
    //       }),
    //     })
    //   }
    // />
  );

  const tableComponent = (
    <Card css={{ borderRadius: 20 }}>
      <Row gutter={10}>
        {!noHeader && (
          <>
            {typeof customHeader === 'function' ? (
              customHeader(searchComponent, refetch, data?.data)
            ) : (
              <Col md={{ span: 8 }} xs={24} css={{ marginBottom: 20 }}>
                {searchComponent}
              </Col>
            )}
            {extraHeader}
          </>
        )}
        <Col xs={24} css={{ marginTop: 15 }}>
          <Table
            scroll={{ x: 900 }}
            pagination={
              noPage
                ? false
                : {
                    total: count,
                    pageSize,
                    showTotal: (total) => (
                      <div css={{ marginRight: 16 }}>
                        <Typography.Text strong>Total {total} items</Typography.Text>
                      </div>
                    ),
                    position: ['bottomRight'],
                  }
            }
            onChange={({ pageSize, current }) => {
              refetch({
                ...restOption.variables,
                skip: `${(pageSize || 0) * ((current || 0) - 1)}`,
                limit: `${pageSize}`,
              });
              setPageSize(pageSize || DEFAULT_PAGE_SIZE);
            }}
            loading={loading}
            dataSource={result || []}
            {...tableProps}
          />
        </Col>
      </Row>
    </Card>
  );

  return {
    loading,
    refetchData: (filters?: Record<string, string>) =>
      refetch({
        ...restOption.variables,
        ...filters,
      }),
    tableComponent,
    tableData: result || [],
    searchComponent,
    refetched,
    data: data || {},
    refetch,
  };
}

export default useTableData;
