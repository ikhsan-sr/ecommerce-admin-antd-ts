import { useRouter } from 'next/router';
import { Spin, Typography, Card, Row, Col, Divider } from 'antd';

import useTableData from '@/hooks/useTableData/v2';
import { API_URL } from '@/constants/env';

import { COLUMN_PRODUCTS } from './columns';
import { cssDetailCart } from './styles';

const { Title } = Typography;

const Products = () => {
  const router = useRouter();
  const { id } = router.query;

  const { tableComponent, data, loading } = useTableData(`${API_URL}/carts/${id}`, {
    noPage: true,
    responseKey: 'products',
    customHeader: () =>  'Products',
    tableProps: { columns: COLUMN_PRODUCTS },
  });

  return (
    <Spin spinning={loading}>
      <div css={cssDetailCart}>
        <Title level={4}>Cart {id}</Title>

        <Card>
          <Row>
            <Col span={24}>Details: </Col>
            <Divider />
            <Col span={12}>User: {data.userId || ''}</Col>
            <Col span={12}>Total Item: {data.totalQuantity || ''}</Col>
            <Col span={12}>Total Discount: ${data.discountedTotal}</Col>
            <Col span={12}>Total Amount: ${data.total}</Col>
          </Row>
        </Card>

        {tableComponent}
      </div>
    </Spin>
  )
}

export default Products