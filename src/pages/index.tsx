import { useState } from 'react';
import { useIntl, setLocale, getLocale } from 'umi';
import { Button, Form } from 'antd';
import Tab from '../components/Tab';
import SplitScreen from '../components/SplitScreen';
import Incomplete from '@/components/Incomplete';
import './index.less';

import useFormValid from '../hooks/useFormValid';

export default function () {
  const intl = useIntl();
  const [singleScreen, setSingleScreen] = useState(true);
  const [loadSplit, setLoadSplit] = useState(false);

  const validData = [
    {
      suffix: '_username',
      label: 'form.username',
      rules: {
        required: true,
        message: intl.formatMessage({
          id: 'form.username_tips',
        }),
      },
    },
    {
      suffix: '_password',
      label: 'form.password',
      rules: {
        required: true,
        message: intl.formatMessage({
          id: 'form.password_tips',
        }),
      },
    },
    {
      suffix: '_phone',
      label: 'form.phone',
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'form.phone_empty_tips',
          }),
        },
        (val: any) => {
          if (val && val.length !== 11) {
            return intl.formatMessage({
              id: 'form.phone_error_tips',
            });
          }
        },
      ],
    },
    {
      suffix: '_area',
      label: 'form.area',
      rules: {
        required: true,
        message: intl.formatMessage({
          id: 'form.area_tips',
        }),
      },
    },
  ];

  const [currTab, setCurrTab] = useState(getLocale());

  const [form] = Form.useForm();

  const { localesData, errorList, formValidate } = useFormValid(
    validData,
    form,
  );

  const switchScreen = () => {
    if (!loadSplit) {
      setLoadSplit(true);
    }
    setSingleScreen(!singleScreen);
  };

  const submit = async () => {
    try {
      const res = await formValidate();
      console.log('.......', res);
    } catch {
      console.log('err');
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
        <Button type="primary" onClick={submit}>
          submit
        </Button>
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
      <Incomplete
        errorList={errorList}
        singleScreen={singleScreen}
        currTab={currTab}
        setCurrTab={(key: string) => changeTab(key)}
      />
    </>
  );
}
