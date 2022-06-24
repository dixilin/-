import { useState, useEffect } from 'react';
import { useIntl, setLocale, getLocale } from 'umi';
import { Button, Form } from 'antd';
import Tab from '../components/Tab';
import SplitScreen from '../components/SplitScreen';
import Incomplete from '@/components/Incomplete';
import './index.less';

export default function () {
  const intl = useIntl();
  const [singleScreen, setSingleScreen] = useState(true);
  const [loadSplit, setLoadSplit] = useState(false);

  const [errorList, setErrorList] = useState<any[]>([]);

  const [localesData, setLocalesData] = useState<any[]>([]);
  const [formValidList, setFormValidList] = useState<any[]>([
    {
      suffix: '_username',
      label: 'form.username',
      tips: 'form.username_tips',
    },
    {
      suffix: '_password',
      label: 'form.password',
      tips: 'form.password_tips',
    },
    {
      suffix: '_phone',
      label: 'form.phone',
      tips: 'form.phone_empty_tips|form.phone_error_tips',
    },
  ]);

  const [currTab, setCurrTab] = useState(getLocale());

  useEffect(() => {
    setTimeout(() => {
      const localesData = [
        {
          tab: '中文',
          name: 'zh-CN',
        },
        {
          tab: 'English',
          name: 'en-US',
        },
        {
          tab: '日本語',
          name: 'ja-JP',
        },
      ];
      setLocalesData(localesData);
      let list: any[] = [];
      localesData.forEach((item) => {
        formValidList.forEach((el) => {
          list.push({
            lang: item.name,
            value: item.name + el.suffix,
            ...el,
          });
        });
      });
      setFormValidList(list);
    }, 500);
  }, []);

  const switchScreen = () => {
    if (!loadSplit) {
      setLoadSplit(true);
    }
    setSingleScreen(!singleScreen);
  };

  const [form] = Form.useForm();

  const submit = async () => {
    try {
      const res = await formValidate();
      console.log('.......', res);
    } catch {
      console.log('err');
    }
  };

  const formValidate = async () => {
    try {
      const res = await form.validateFields();
      setErrorList([]);
      return res;
    } catch (err: any) {
      console.log('.......', err);
      const errList = [
        ...new Set(
          err.errorFields.map((item: any) => {
            return item.name[0];
          }),
        ),
      ];

      const res = formValidList.filter((item) => {
        return errList.includes(item.value);
      });
      setErrorList(res);
      return Promise.reject();
    }
  };

  const changeTab = (key: string) => {
    setCurrTab(key);
  };

  return (
    <>
      <button
        onClick={() => {
          setLocale('en-US', false);
        }}
      >
        切换英文
      </button>
      <button
        onClick={() => {
          setLocale('zh-CN', false);
        }}
      >
        切换中文
      </button>
      <button
        onClick={() => {
          setLocale('ja-JP', false);
        }}
      >
        切换日语
      </button>
      <p>
        {intl.formatMessage(
          {
            id: 'WELCOME_TO_UMI_WORLD',
          },
          {
            name: '旅行者',
          },
        )}
      </p>
      <Button type="primary" onClick={switchScreen}>
        {singleScreen ? '切换双屏' : '切换单屏'}
      </Button>
      <Form form={form}>
        <Tab
          hidden={!singleScreen}
          form={form}
          localesData={localesData}
          formValidate={formValidate}
          setCurrTab={(key: string) => changeTab(key)}
          currTab={currTab}
        />
        {loadSplit && (
          <SplitScreen hidden={singleScreen} formValidate={formValidate} />
        )}
      </Form>
      <Button type="primary" onClick={submit}>
        submit
      </Button>
      {errorList.length > 0 && (
        <Incomplete
          errorList={errorList}
          currTab={currTab}
          setCurrTab={(key: string) => changeTab(key)}
        />
      )}
    </>
  );
}
