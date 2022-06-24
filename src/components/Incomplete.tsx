import { useIntl, setLocale } from 'umi';
import { Popover } from 'antd';

import useLang from '../hooks/useLang';

interface IProps {
  errorList?: any[];
  currTab: string;
  setCurrTab: (key: string) => void;
}

const ItemC = ({ item, currTab, setCurrTab }) => {
  const langPkg = useLang(item.lang);
  const intl = useIntl();
  console.log(langPkg, item);
  console.log(currTab);
  return (
    <li style={{ listStyle: 'none' }}>
      {langPkg[item.label]} -
      <span style={{ color: 'red' }}>
        {intl.formatMessage({
          id: item.tips,
        })}
      </span>
      {currTab !== item.lang && (
        <span
          style={{ color: 'orange' }}
          onClick={() => {
            setCurrTab(item.lang);
          }}
        >
          {' '}
          - 去完善
        </span>
      )}
    </li>
  );
};

const Content = (list: any[], currTab: string, setCurrTab: any) => {
  return (
    <ul style={{ padding: 0 }}>
      {list.map((item, index) => {
        return (
          <ItemC
            key={index}
            item={item}
            currTab={currTab}
            setCurrTab={setCurrTab}
          />
        );
      })}
    </ul>
  );
};

const Incomplete: React.FC<IProps> = ({
  errorList = [],
  currTab,
  setCurrTab,
}) => {
  return (
    <div>
      <Popover
        placement="bottomLeft"
        title="以下信息未完善，请完善后提交"
        trigger="click"
        content={() => Content(errorList, currTab, setCurrTab)}
      >
        <p
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
        >{`${errorList.length}条信息未完善`}</p>
      </Popover>
    </div>
  );
};

export default Incomplete;
