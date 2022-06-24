import { useState } from 'react';
import { Tabs, Form, Button } from 'antd';
import { getLocale } from 'umi';
import LocaleForm from './LocaleForm';

const { TabPane } = Tabs;

interface Iprops {
  hidden?: boolean;
  form?: any;
  localesData: any[];
  currTab: string;
  formValidate: () => void;
  setCurrTab: (key: string) => void;
}

const Tab: React.FC<Iprops> = ({
  hidden = false,
  form,
  localesData,
  formValidate,
  setCurrTab,
  currTab
}) => {
  const locale = getLocale();

  const onChange = (key: string) => {
    setCurrTab(key);
  };

  const [activeKey, setActiveKey] = useState('zh-CN');

  return (
    <div className={hidden ? 'hidden' : ''}>
      <Tabs onChange={onChange} activeKey={currTab}>
        {localesData.length &&
          localesData.map((item, index) => {
            return (
              <TabPane forceRender tab={item.tab} key={item.name}>
                <LocaleForm
                  formName={item.name}
                  local={index === 0}
                  form={form}
                  formValidate={formValidate}
                />
              </TabPane>
            );
          })}
      </Tabs>
    </div>
  );
};

export default Tab;
