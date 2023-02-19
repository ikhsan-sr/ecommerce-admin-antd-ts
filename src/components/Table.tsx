import { PropsWithChildren } from 'react';

import { Table as ATable, TableProps } from 'antd';
import Image from 'next/image';

import { CRN10, CRN100 } from '@/constants/colors';

/**
 * This component override Antd table for global config
 */
function Table<RecordType extends object>(props: PropsWithChildren<TableProps<RecordType>>) {
  return (
    <ATable<RecordType>
      css={{
        '.ant-table-thead': {
          '>tr': {
            '>th': {
              background: CRN10,
              borderBottom: `1px solid ${CRN100}`,
            },
          },
        },
      }}
      {...props}
      locale={{
        emptyText: (
          <>
            <Image src="/empty-image.svg" width={198} height={121} alt="" />
            <p css={{ fontSize: 14 }}>
              There was <span css={{ color: '#00ADEE' }}>no data found.</span>
            </p>
          </>
        ),
      }}
    />
  );
}

export default Table;
