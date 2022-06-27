import { Checkbox, Form, Input, Select } from 'antd';
import useLang from '../hooks/useLang';

interface Iprops {
  formName?: string;
  local?: boolean;
  form?: any;
  formValidate?: () => void;
}

const MyForm: React.FC<Iprops> = ({
  formName = 'zh-CN',
  local = true,
  form,
  formValidate,
}) => {
  const langPkg = useLang(formName);

  const getPasswordKeys = () => {
    if (!form) {
      return [];
    }
    return Object.keys(form.getFieldsValue()).filter((item) => {
      return item.indexOf('_password') > 0;
    });
  };

  const areas = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
  ];

  return (
    <>
      <Form.Item
        label={langPkg['form.username']}
        name={`${formName}_username`}
        rules={[{ required: true, message: langPkg['form.username_tips'] }]}
        // validateTrigger="onBlur"
      >
        <Input
          onBlur={() => {
            formValidate!();
          }}
        />
      </Form.Item>
      <Form.Item
        label={langPkg['form.password']}
        name={`${formName}_password`}
        rules={[{ required: true, message: langPkg['form.password_tips'] }]}
        // validateTrigger="onBlur"
      >
        <Input.Password
          disabled={!local}
          onBlur={(e) => {
            getPasswordKeys().forEach((el) => {
              form.setFieldsValue({
                [el]: e.target.value,
              });
            });
            formValidate!();
          }}
        />
      </Form.Item>
      <Form.Item
        label={langPkg['form.phone']}
        name={`${formName}_phone`}
        // validateTrigger="onBlur"
        rules={[
          { required: true, message: langPkg['form.phone_empty_tips'] },
          () => ({
            validator(_, value) {
              if (value && value.length !== 11) {
                return Promise.reject(langPkg['form.phone_error_tips']);
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          onBlur={() => {
            formValidate!();
          }}
        />
      </Form.Item>
      <Form.Item
        label={langPkg['form.area']}
        name={`${formName}_area`}
        rules={[{ required: true, message: langPkg['form.area_tips'] }]}
      >
        <Select options={areas} onChange={() => formValidate!()} />
      </Form.Item>
      <Form.Item
        name={`${formName}_remember`}
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>{langPkg['form.checked']}</Checkbox>
      </Form.Item>
    </>
  );
};
export default MyForm;
