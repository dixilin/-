import { Checkbox, Form, Input } from 'antd';
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

  return (
    <>
      <Form.Item
        label={langPkg['form.username']}
        name={`${formName}_username`}
        rules={[{ required: true, message: langPkg['form.username_tips'] }]}
      >
        <Input
          onChange={() => {
            formValidate!();
          }}
        />
      </Form.Item>
      <Form.Item
        label={langPkg['form.password']}
        name={`${formName}_password`}
        rules={[{ required: true, message: langPkg['form.password_tips'] }]}
      >
        <Input.Password
          disabled={!local}
          onChange={(e) => {
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
          onChange={() => {
            formValidate!();
          }}
        />
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
