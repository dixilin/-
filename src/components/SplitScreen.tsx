import { Col, Row } from 'antd';
import LocaleForm from './LocaleForm';

interface Iprops {
  hidden?: boolean;
  formValidate?: () => void;
}

const SplitScreen: React.FC<Iprops> = ({ hidden = false, formValidate }) => {
  return (
    <div className={hidden ? 'hidden' : ''}>
      <Row>
        <Col span={12}>
          <LocaleForm formName="zh-CN" formValidate={formValidate} />
        </Col>
        <Col span={12}>
          <LocaleForm formName="en-US" formValidate={formValidate} />
        </Col>
      </Row>
    </div>
  );
};

export default SplitScreen;
