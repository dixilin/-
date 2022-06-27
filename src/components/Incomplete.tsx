import { Popover } from 'antd';

import useLang from '../hooks/useLang';

interface IProps {
  errorList?: any[];
  currTab: string;
  singleScreen: boolean;
  setCurrTab: (key: string) => void;
}

type ItemProps = {
  item: any
} & IProps

const ItemC: React.FC<ItemProps> = ({
  item,
  currTab,
  setCurrTab,
  singleScreen,
}) => {
  const langPkg = useLang(item.lang);
  function validator(el: HTMLInputElement, rules: any) {
    if (Array.isArray(rules)) {
      for (let k of rules) {
        if (typeof k === 'object') {
          if (k.required && !el.value.trim()) {
            return k.message;
          }
        } else {
          return k(el.value);
        }
      }
    } else {
      if (
        rules.required &&
        (el.value.trim() === '' || el.value === null || el.value === undefined)
      ) {
        return rules.message;
      }
    }
  }

  return (
    <li style={{ listStyle: 'none' }}>
      {langPkg[item.label]} -
      <span style={{ color: 'red' }}>
        {validator(
          document.getElementById(item.value) as HTMLInputElement,
          item.rules,
        )}
      </span>
      {currTab !== item.lang && singleScreen && (
        <span
          style={{ color: 'orange' }}
          onClick={() => {
            setCurrTab(item.lang);
            setTimeout(() => {
              document.documentElement.scrollTop =
                document.getElementById(item.value)!.getBoundingClientRect().y +
                document.documentElement.scrollTop;
            }, 16);
          }}
        >
          {' '}
          - 去完善
        </span>
      )}
    </li>
  );
};

const Content = ({ errorList, currTab, setCurrTab, singleScreen }: IProps) => {
  return (
    <ul style={{ padding: 0 }}>
      {errorList!.map((item, index) => {
        return (
          <ItemC
            key={index}
            item={item}
            currTab={currTab}
            setCurrTab={setCurrTab}
            singleScreen={singleScreen}
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
  singleScreen,
}) => {
  return (
    <div>
      {errorList.length > 0 ? (
        <Popover
          placement="bottomLeft"
          title="以下信息未完善，请完善后提交"
          trigger="click"
          content={() =>
            Content({ errorList, currTab, setCurrTab, singleScreen })
          }
        >
          <p
            style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
          >{`${errorList.length}条信息未完善`}</p>
        </Popover>
      ) : null}
    </div>
  );
};

export default Incomplete;
