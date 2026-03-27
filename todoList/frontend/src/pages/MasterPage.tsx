import { useState } from "react";
import { Tab, Tabs } from '@mui/material';
import SystemMasterTab from './master/SystemMasterTab';
import ProjectMasterTab from './master/ProjectMasterTab';
import CodeMasterTab from './master/CodeMasterTab';
import GroupCodeMasterTab from './master/GroupCodeMasterTab';

/**
 * マスタ管理ページ
 * タブ切り替えで各マスタ管理画面を表示する
 */
const MasterPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{ mb: 2 }}>
        <Tab label="システムマスタ" />
        <Tab label="プロジェクトマスタ" />
        <Tab label="コードマスタ" />
        <Tab label="コードグループマスタ" />
      </Tabs>
      {tabIndex === 0 && <SystemMasterTab />}
      {tabIndex === 1 && <ProjectMasterTab />}
      {tabIndex === 2 && <CodeMasterTab />}
      {tabIndex === 3 && <GroupCodeMasterTab />}
    </div>
  );
};

export default MasterPage;
