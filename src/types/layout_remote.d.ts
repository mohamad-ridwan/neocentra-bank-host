declare module 'layout_remote/Layout' {
  import React from 'react';
  export interface LayoutProps {
    children: React.ReactNode;
  }
  const Layout: React.ComponentType<LayoutProps>;
  export default Layout;
}

declare module 'layout_remote/Header' {
  import React from 'react';
  const Header: React.ComponentType<any>;
  export default Header;
}

declare module 'layout_remote/Sidebar' {
  import React from 'react';
  const Sidebar: React.ComponentType<any>;
  export default Sidebar;
}
