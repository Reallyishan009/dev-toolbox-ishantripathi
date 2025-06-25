import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    const root = document.body;
;
    if (darkMode) {
      root.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
      />
    </div>
  );
}

export default DarkModeToggle;
