import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Layout as AntdLayout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = AntdLayout;

import { MENUS } from './consts';
import { cssLayout } from './styles';

const Layout: React.FC = ({ children }: any) => {
  const { pathname } = useRouter();

  const openedKeys = useMemo(
    () => MENUS?.find((item) => item.url.includes(pathname))?.key || 1,
  [pathname]);

  return (
    <AntdLayout css={cssLayout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[String(openedKeys)]}
          items={MENUS}
        />
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Muhammad Ikhsan ©2023</Footer>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;