import { useEffect, useState } from 'react';

interface IProps {
  suffix: string;
  label: string;
  rules: any;
}
export default (validData: IProps[], form: any) => {
  const [formValidList, setFormValidList] = useState([]);
  const [localesData, setLocalesData] = useState<any[]>([]);

  const [errorList, setErrorList] = useState<any[]>([]);

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
        // {
        //   tab: '日本語',
        //   name: 'ja-JP',
        // },
      ];
      setLocalesData(localesData);
      let list: any = [];
      localesData.forEach((item) => {
        validData.forEach((el) => {
          list.push({
            lang: item.name,
            value: item.name + el.suffix,
            ...el,
          });
        });
      });
      console.log('...,list', list);
      setFormValidList(list);
    }, 500);
  }, []);

  const formValidate = async () => {
    try {
      const res = await form.validateFields();
      setErrorList([]);
      return res;
    } catch (err: any) {
      const errList = [
        ...new Set(
          err.errorFields.map((item: any) => {
            return item.name[0];
          }),
        ),
      ];

      const res = formValidList.filter((item: any) => {
        return errList.includes(item.value);
      });
      setErrorList(res);
      return Promise.reject();
    }
  };

  return {
    localesData,
    errorList,
    formValidate,
  };
};
